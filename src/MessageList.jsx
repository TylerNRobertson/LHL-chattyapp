import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
    const {messages} = this.props;
    return (
      <main className="messages">
        {messages.map((message) => {
          return <Message type={message.type} key={message.id} username={message.username} content={message.content} notifycontent={message.notifycontent} style={{color: message.usercolor}}/>
        })}
      </main>
    );
  }
}
export default MessageList;
// {messages.map ((message) =>
//   <Message />
// )}
