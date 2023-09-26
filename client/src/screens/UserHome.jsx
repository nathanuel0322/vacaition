import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { db } from '../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { animated, useSpring, useTransition } from 'react-spring';
import '../assets/css/home.css';
import Recommendations from '../components/home/Recommendations';


export default function UserHome({ authfunc }){
  const { user, login, logout} = useContext(AuthContext);
  const [questcomplete, setQuestComplete] = useState(null);
  const [resultsobj, setResultsObj] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transitionDirection, setTransitionDirection] = useState('next');
  const [currentrecommendation, setCurrentRecommendation] = useState({});
  const navigate = useNavigate();
  const pages = [0, 1, 2]
  
  const transitions = useTransition(currentPage, {
    from: (item) => {
      if (item === 1) {
        // For the first slide, start from the middle
        return { opacity: 0, transform: 'translate3d(0,0,0)' };
      } else {
        // For other slides, start from the right or left
        return {
          opacity: 0,
          transform: transitionDirection === 'next'
            ? 'translate3d(200%,0,0)'
            : 'translate3d(-200%,0,0)',
        };
      }
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(-200%,0,0)' : 'translate3d(200%,0,0)' },
  })

  function buttonHandler(recobj) {
    setCurrentRecommendation(recobj);
    setCurrentPage(2);
  }

  useEffect(() => {
    // fetch recommendations document from firestore
    const userUid = user.uid;
    const parentDocRef = doc(db, 'data', userUid);
    const recommendationsCollection = collection(parentDocRef, 'recommendations');
    getRecommendations();
    
    async function getRecommendations() {
      // get the single document in the recommendations collection
      const recommendationsSnapshot = await getDocs(recommendationsCollection);
      const recommendationsData = recommendationsSnapshot.docs.map(doc => doc.data());
      const recommendationsObj = recommendationsData[0];
      console.log("recobj: ", recommendationsObj);
      setResultsObj(recommendationsObj);
    };
  }, [])

  return(
    <div id="homeouterdiv" className='!min-h-screen'>
      {/* temporary log out button */}
      {/* <button id='signinbutton' onClick={() => {logout(); authfunc(true)}}>Sign Out</button> */}
      {resultsobj ? (
        transitions((style, item) => {
          return (
            <animated.div style={style} className='absolute w-screen'>
              {/* About You Q */}
              {pages[item] === 0 && (
                <div id="aboutyoudiv" className='flex flex-col items-center justify-center'>
                  {/* Put Back to Home button here */}
                  <div id='aboutyouttitle' className='text-center'>About You</div>
                  {/* Load past questionnaire with data filled in from firestore */}
                  <div id='aboutyoubuttondiv' className='flex flex-row items-center justify-center'>
                    {/* Place cancel and update buttons here */}
                  </div>
                </div>
              )}
              {/* Your Current Recommendations */}
              {pages[item] === 1 && (
                <div id="currecdiv" className='flex flex-col items-center justify-center'>
                  <button id='signinbutton' onClick={() => {logout(); authfunc(true)}}>Sign Out</button>
                  <div id='outertyped'>Your Current Recommendations</div>
                  <Recommendations resultsdata={resultsobj} showbuttons={true} buttonfunc={buttonHandler}/>
                </div>
              )}
              {/* Your personalized travel plan */}
              {pages[item] === 2 && (
                <div id='travelplandiv' className='flex flex-col items-center justify-center text-center'>
                  {/* Put "Back to Home" button here */}
                  <div id='outertyped'>Your personalized travel plan</div>
                  {/* Put personalized travel plan component here */}
                  {/* Put "Download as PDF" button here */}
                </div>
              )}
            </animated.div>
          )
        })
      ) : (
        <div id='questouterdiv' className='absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'>
          <RingLoader color='#FFA500' loading={true} size={150} />
        </div>
      )}
    </div> 
  )
}