import React from 'react';
import './Message.css';
const Message = props => {
    let classesSpan = ['Message-text'];
    if (props.fromSender) {
        classesSpan.push('Message-text-send');
    } else {
        classesSpan.push('Message-text-receive');
    }

    let classesDiv = ['Message'];
    if (props.fromSender) {
        classesDiv.push('Message-send');
    } else {
        classesDiv.push('Message-receive');
    }

    return (
        <div className={classesDiv.join(' ')}>
            {!props.fromSender ? <span className="Message-avatar">
                T
            </span> : null}
            <span className={classesSpan.join(' ')}>{props.msg}</span>
        </div>);
};
export default Message;