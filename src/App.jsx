import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
class App extends Component {
  render() {
    return (
      <section>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList />
      <ChatBar />
    </section>
    );
  }
}
export default App;
