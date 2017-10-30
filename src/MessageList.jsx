import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message />
      </main>
    );
  }
}
export default MessageList;
