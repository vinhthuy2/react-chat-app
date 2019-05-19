import React from 'react';
import './App.css';
import ChatBox from './containers/ChatBox/ChatBox';

function App() {
  return (
    <div className="container border">
      <div className="App-chat-box">
        <ChatBox></ChatBox>
      </div>
    </div>
  );
}

export default App;
