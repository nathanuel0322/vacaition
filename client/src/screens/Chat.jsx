import React, { useState, useEffect, useRef, useContext } from 'react';
import '../assets/css/people.css';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import MessageInput from '../components/chat/MessageInput';
import MessageList from '../components/chat/MessageList';

export default function Chat(){
    const { recipientId } = useParams();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [room, setRoom] = useState(recipientId > user.uid ? recipientId + user.uid : user.uid + recipientId);
    // fetch(`https://localhost:8000/buddies/${user.uid}`)
    //     .then(response => response.json())
    //     .then(data => setPeople(data));
    // room is gonna be equal to the room id
    // the string that is greater will be the first string in the concatenation
    // let room;
    // if (user.uid < recipientId){
    //     room = recipientId + user.uid;
    // }
    // else{
    //     room = user.uid + recipientId;
    // }
    return(
        <div style={{minHeight: '100vh'}}>
            <h2>Chat with {recipientId}</h2>
            <div style={{marginBottom: '1rem'}}>
                <button onClick={() => navigate('/people')}>⬅️ Back to People</button>
            </div>
            <div className="messages-container">
                <MessageList roomId={room} />
                <MessageInput roomId={room} />
            </div>
        </div>
    )
}