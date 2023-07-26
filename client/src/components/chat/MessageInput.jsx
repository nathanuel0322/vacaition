import React, {useState, useContext} from 'react';
import { sendMessage } from '../global/functions';
import '../../assets/css/mi.css'
import { AuthContext } from '../../App';

export default function MessageInput({ roomId }) {
    const {user} = useContext(AuthContext);
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(roomId, user, value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disabled={value < 1} className="send-message">
                Send
            </button>
        </form>
    );
}