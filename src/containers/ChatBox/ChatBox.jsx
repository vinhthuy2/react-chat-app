import React, {
    Component
} from "react";

import io from 'socket.io-client';

import "./ChatBox.css";
import Message from "../../components/Message/Message";
class ChatBox extends Component {
    state = {
        message: '',
        messages: []
    }
    socket = null
    componentDidMount = () => {
        this.socket = io('http://localhost:3000');
        this.socket.on('chat message', (msg) => {
            console.log('broadcast receive');

            this.setState((preState) => {
                return {
                    ...preState,
                    messages: [...preState.messages, {
                        msg: msg,
                        sender: 'somebody'
                    }]
                }
            })
        });
    }

    sendHandler = () => {
        if (this.socket) {
            console.log("send");

            this.socket.emit('chat message', this.state.message);
            this.setState((prevState) => {
                return {
                    message: '',
                    messages: [...prevState.messages, {
                        msg: prevState.message,
                        sender: null
                    }]
                }
            })
        }
    }

    inputOnchangeHandler = (event) => {
        this.setState({ message: event.target.value })
    }

    onKeyDownHandler = (event) => {

        if (event.keyCode === 13) {
            console.log(event.keyCode);
            this.sendHandler();
        }
    }

    render() {
        let messages = this.state.messages.map((m, idx) => (
            <Message key={idx} fromSender={!m.sender} msg={m.msg} />
        ))
        return (
            <div className="ChatBox">
                <div className="d-flex justify-content-between">
                    <span>Broadcast</span>
                    <div>
                        <button>_</button>
                        <button>x</button>
                    </div>
                </div>
                <div className="ChatBox-Messages">
                    {messages}
                </div>
                <div className="ChatBox-Input-Bar">
                    <input
                        type='text'
                        onKeyDown={(event) => this.onKeyDownHandler(event)}
                        onChange={this.inputOnchangeHandler}
                        value={this.state.message}
                        className="form-control"
                        placeholder="Your message..." />
                    <button onClick={this.sendHandler} className="btn btn-primary">Send</button>
                </div>
            </div>);
    }
}

export default ChatBox;