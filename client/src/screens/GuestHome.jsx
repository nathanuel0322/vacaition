import React, { useState, useEffect, useRef, useContext } from 'react';
import Typed from "typed.js";
import Quest from '../components/home/Quest';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Results from './Results';
import { RingLoader } from 'react-spinners';
import { auth, db } from '../firebase';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import '../assets/css/home.css';
import ExampleResults from '../components/examples/ExampleResults';
import { toast } from 'react-toastify';


export default function GuestHome(){
  const { user, login, logout} = useContext(AuthContext);
  const [questcomplete, setQuestComplete] = useState(null);
  const [resultsobj, setResultsObj] = useState(null);
  const navigate = useNavigate();
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  
  // Create reference to store the Typed instance itself
  const typed = useRef(null);
  // const {user} = useContext(AuthContext); 
    
  useEffect(() => {
    const options = {
      strings: [
        'Welcome to vacAItion!'
      ],
      typeSpeed: 45,
      backSpeed: 45,
      loop: true,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);
    
    return () => {
      // Make sure to destroy Typed instance during cleanup to prevent memory leaks
      typed.current.destroy();
    }
  }, [])

  useEffect(() => {
    let currentuser = auth.currentUser;
    let userUid = null;
    if (currentuser) {
      userUid = currentuser.uid;
    }
    if (questcomplete) {
      getQuestData();
    }

    async function getQuestData() {
      if (process.env.NODE_ENV === 'development') {
        // make a post request to the server to get the results
        fetch("http://127.0.0.1:8000/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questcomplete),
        })
          .then(response => response.json())
          .then(async myList => {
            console.log("data is: ", JSON.parse(myList));
            const jsoncall = JSON.parse(myList);
            console.log("typeof myList.plan is: ", typeof jsoncall.plan);
            console.log("myList.plan is: ", jsoncall.plan);
            if (jsoncall.plan && typeof jsoncall.plan === 'object') {
              const destinationList = Object.keys(jsoncall.plan).map((destination) => ({
                name: destination,
                description: jsoncall.plan[destination]
              }));
              jsoncall.plan = destinationList;
              console.log("resultsobj is: ", jsoncall);
              // store jsoncall in firestore
              const parentDocRef = doc(db, 'data', userUid);
              // write {sample: 'sample'} into the document title userUid
              await setDoc(parentDocRef, {sample: 'sample'});
              const resultsCollectionRef = collection(parentDocRef, 'recommendations');
              // pass the description object without the "title" key to the document
              await addDoc(resultsCollectionRef, {...Object.keys(jsoncall[0]["description"])
                .filter(key => key !== "title")
                .reduce((obj, key) => {
                  obj[key] = jsoncall[0]["description"][key];
                  return obj;
                }, {}), timestamp: serverTimestamp()});
              setResultsObj(jsoncall);
            }
          })
          .catch(error => {
            console.log(error);
            toast.error("Someone else is generating their destinations right now. Please try again in a bit!", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored"
            });
          });
      } else if (process.env.NODE_ENV === 'production') {
        // modal server
        fetch(`https://swappysh--main-py-fastapi-app-dev.modal.run/plan/${userUid}`)
          .then(response => response.json())
          .then(myList => {
            console.log("data is: ", myList);
            const destinationList = Object.keys(myList.plan).map((destination) => ({
                name: destination,
                description: myList.plan[destination]
            }));
            myList.plan = destinationList;
            navigate("/results", { state: { myList }})
          })
          .catch(error => {
            console.log(error);
            toast.error("Someone else is generating their destinations right now. Please try again in a bit!", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored"
            });
          });
      }
    }
  }, [questcomplete])

  return(
    <div id="homeouterdiv">
      <button id='signinbutton' onClick={() => navigate("/signin")}>Log in</button>
      <div id='outertyped'>
        <span id='typedvote' className='blinkingorange' ref={el} />
      </div>
      {questcomplete ?
        resultsobj ?
          <Results resultsdata={resultsobj} />
        :
          <div id='questouterdiv' className='absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'>
            <RingLoader color='#FFA500' loading={true} size={150} />
          </div>
      :
        <Quest questfunc={setQuestComplete} />
        // <ExampleResults />
      }
    </div> 
  )
}