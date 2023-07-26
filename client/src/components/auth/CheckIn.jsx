import React, {useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../App';
import { useNavigate, Redir } from "react-router-dom";
import { db } from '../../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { auth } from '../../firebase';
import '../../assets/css/checkin.css'

export default function CheckIn({ setCheckinFinished }) {
    const [checkinobj, setCheckinObj] = useState({
        description: '',
        age: 0,
        hobbies: '',
        vacationType: '',
        personType: ''
    });
    const [transitionDirection, setTransitionDirection] = useState('next');
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const questions = [
        {title: '1. Describe yourself.', name: 'description'},
        {title: '2. How old are you?', name: 'age'},
        {title: '3. What are your hobbies?', name: 'hobbies'},
        {title: '4. What type of vacations do you enjoy?', name: 'vacationType'},
        {title: '5. Are you an introvert or an extrovert? How often do you socialize?', name: 'personType'}
    ]
    
    const transitions = useTransition(currentQuestion, {
        from: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(200%,0,0)' : 'translate3d(-200%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(-200%,0,0)' : 'translate3d(200%,0,0)' },
        // config: { duration: 5000 },
    })

    async function saveDescriptiontoFirebase() {
        // get user id
        const user = auth.currentUser;
        const userUid = user.uid;
        console.log("current user uid: ", userUid);
        console.log("someobj: ", checkinobj);
        
        // Create a reference to the parent document 'data/user/id'
        const parentDocRef = doc(db, 'data', userUid);
        
        // Create a reference to the 'quest' subcollection within the parent document
        const questCollectionRef = collection(parentDocRef, 'info');
        await addDoc(questCollectionRef, ({...checkinobj, age: parseInt(checkinobj.age)}));
    }

    return(
        <div id='checkindiv'>
            {/* <h1 className='text-2xl font-bold'>Tell us more about yourself!</h1> */}
            {transitions((style, i) => (
                <animated.div style={style} className="absolute flex flex-col items-center justify-center mx-8 mt-8">
                    <p className='questtitle'>{questions[i].title}</p>
                    <div className="textbox">
                        {questions[i].name === 'age' ? (
                            <input autoFocus={true} type="number" min="0" max="100"
                                onChange={(e) => {
                                    setCheckinObj({...checkinobj, [questions[i].name]: e.target.value});
                                }}
                                value={checkinobj[questions[i].name]}
                            />
                        ) : (
                            <textarea
                                // autoFocus={currentQuestion === i}
                                onChange={(e) => {
                                    setCheckinObj({...checkinobj, [questions[i].name]: e.target.value});
                                }}
                                value={checkinobj[questions[i].name]}
                                className='checkintextarea'
                            >
                            </textarea>
                        )}
                    </div>
                    {currentQuestion !== 0 && (
                        <button id='prevq'
                            className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white'
                            onClick={() => { 
                                setTransitionDirection('previous');
                                setCurrentQuestion(currentQuestion - 1);
                            }}
                        >
                            Last Question
                        </button>
                    )}
                    <button 
                        // className="checkinbutton"
                        id={currentQuestion === questions.length - 1 ? 'questsubmit' : 'nextq'}
                        className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white'
                        onClick={async () => {
                            if (currentQuestion === questions.length - 1) {
                                // if last question, send object to firebase
                                await saveDescriptiontoFirebase();
                                setCheckinFinished(true);
                            } else {
                                setTransitionDirection('next');
                                setCurrentQuestion(currentQuestion + 1);
                            }
                        }}
                    >
                        {currentQuestion === questions.length - 1 ? "Submit" : "Next Question"} 
                    </button>
                </animated.div>
            ))}
        </div>
    );
};