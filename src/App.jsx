import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeName = this.changeName.bind(this);
    this.incomingNotification = this.incomingNotification.bind(this);
    this.state = {
      currentUser: {name: "Bob",
                    usercolor: "black"
                    },
      messages: [], // messages coming from the server will be stored here as they arrive
      userCount: ''
    };
  }

  incomingNotification(data){
      const message = {id: data.id, notification: true, content: data.content}
      const messages = this.state.messages.concat(message);
      this.setState({ messages: messages});
  }

  incomingUserCount(data){
    const userCount = data.count
    this.setState({userCount: userCount})
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  const socket = new WebSocket("ws://localhost:3001")
  console.log('connected to server');
  socket.onopen = (e) => {
    console.log('connected to WebSocket')
    this.setState({socket:socket})
    socket.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages})
        break;
        case "incomingNotification":
          this.incomingNotification(data)
        break;
        case "incomingUserCount":
        this.incomingUserCount(data)
        break;
        case "usercolor":
        this.setState({currentUser: {name: this.state.currentUser.name,
                                    usercolor: data.usercolor}
                                  })
        break;
        default:
          throw new ERROR('Event type unknown ' + data.type)
    }
  }
 }
}

// Enter Message event listener

handleKeyPress(event){
  if(event.key == 'Enter'){
    const newMessage = {
      type: 'postMessage',
      usercolor: this.state.currentUser.usercolor,
      username: this.state.currentUser.name,
      content: event.target.value,
    }
    this.state.socket.send(JSON.stringify(newMessage))
  }
}

// Chnage Name event function

changeName(event){
    if (event.key === "Enter") {
      const oldName = this.state.currentUser.name;

      const newName = event.target.value;
      this.setState({ currentUser: {name: newName}});
      const notification = {
        type: "postNotification",
        content: `${oldName } changed their name to ${newName}`
      };
      this.state.socket.send(JSON.stringify(notification));
    }
  }

    render() {
        return (
        <section>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div id="userCount">user count:{this.state.userCount}</div>
          </nav>
          <MessageList messages={this.state.messages} />
          <ChatBar name={this.state.currentUser.name} changename={this.changeName} pressKey={this.handleKeyPress}/>
        </section>
      );
    }
  }
