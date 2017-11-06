import React, {Component} from 'react';
import ReactDOM from 'react-dom';
class ChatBar extends Component {

  render() {
    return (
          <footer className="chatbar">
              <input className="chatbarusername" id="username" defaultValue={this.props.name} type="text" placeholder="Your Name (Optional)" onKeyPress={this.props.changename} />
              <input className="chatbarmessage" id="newmessage" placeholder="Type a message and hit ENTER" onKeyPress={this.props.pressKey} />
          </footer>
        );
      }
    }
export default ChatBar;
