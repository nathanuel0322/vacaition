import React, {useState, useLayoutEffect, useRef, useContext, useEffect} from 'react';
import { AuthContext } from '../../App';
import { getMessages } from '../global/functions';
import '../../assets/css/messagelist.css';

export default function MessageList({ roomId }) {
    console.log("roomID passed to MessageList: " + roomId)
    const containerRef = useRef(null);
    const { user } = useContext(AuthContext);
    // const [messages, setMessages] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // get messages from firebase
        getMessages(roomId, setMessages);
    }, []);

    useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {messages.map((x) => (
                    <Message
                        key={x.id}
                        message={x}
                        isOwnMessage={x.uid === user.uid}
                    />
                ))}
            </ul>
        </div>
    );
}

function Message({ message, isOwnMessage }) {
    const { displayName, text } = message;
    return (
        <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
            <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
            <div>{text}</div>
        </li>
    );
}