import React, {useContext, useState, useEffect, useRef} from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation } from "react-router-dom";
import { useTransition, animated } from 'react-spring';
import { IoLogoPaypal, IoLogoVenmo, IoCard } from 'react-icons/io5';
import { toast } from 'react-toastify';
import CheckIn from '../components/auth/CheckIn';

import '../assets/css/signupprocess.css'
import '../assets/css/quest.css'

export default function SignupProcess({ authfunc }) {
  const {register} = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [transitionDirection, setTransitionDirection] = useState('next');
  const pages = [0, 1 , 2, 3]
  const [currentPage, setCurrentPage] = useState(0);
  const [checkinfinished, setCheckinFinished] = useState(false);
  const [disablebuttons, setDisableButtons] = useState(false);

  const transitions = useTransition(currentPage, {
    from: (item) => {
      if (item === 0) {
        // For the first slide, start from the middle
        return { opacity: 0, transform: 'translate3d(0,0,0)' };
      } else {
        // For other slides, start from the right or left
        return {
          opacity: 0,
          transform:
            transitionDirection === 'next'
              ? 'translate3d(200%,0,0)'
              : 'translate3d(-200%,0,0)',
        };
      }
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(-200%,0,0)' : 'translate3d(200%,0,0)' },
    // config: { duration: 5000 },
  })

  useEffect(() => {
    if (checkinfinished) {
      setTransitionDirection('next')
      setCurrentPage(currentPage + 1)
    }
  }, [checkinfinished])

  function paymentbuttonclicked() {
    setDisableButtons(true)
    toast.success("Thank you for your payment!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
    });
  }

  // add event listeners for the buttons in #paymentdiv
  useEffect(() => {
    if (document.getElementById('paymentdiv')) {
      Array.from(document.getElementById('paymentdiv').children).forEach((button) => {
        button.addEventListener('click', paymentbuttonclicked)
      })
    }
  }, [currentPage])

  return (
    <div id='signupprocessdiv' className='flex flex-row text-black absolute w-screen'>
      <button id="homebutton" className='text-white' onClick={() => navigate('/')}>Back to Home</button>
      {transitions((style, item) => {
        return (
          <animated.div style={style} className='absolute w-screen'>
            {/* Base Sign Up page */}
            {pages[item] === 0 && (
              <div id='signupdiv' className='parentdiv'>
                <p id='createacc'>Create an Account</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email" type="email-address"
                  autoCapitalize="none" autoCorrect="false"
                />
                <input type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <input type='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <input type='button' onClick={() => {
                  if (password !== confirmPassword) {
                    alert('Passwords do not match');
                  } else {
                    register(email, password)
                      .then((bool) => {
                        if (!bool) {
                          setTransitionDirection('next')
                          setCurrentPage(currentPage + 1)
                        }
                      })
                  }
                }} value='Sign Up' className='buttons'/>
                <p className='text-lg'>Already have an account?</p>
                <button id='signinbutton' style={{background: "none", fontSize: '18px', borderRadius: '1rem'}} className='buttons !mt-4 !relative !top-auto !right-auto !text-black !bg-white !bg-opacity-40'
                  onClick={() => navigate('/signin', {state: {email, password }})}
                >
                  Sign In
                </button>
              </div>
            )}
            {/* Tell us More about Yourself / Check In*/}
            {pages[item] === 1 && (
              <CheckIn setCheckinFinished={setCheckinFinished} />
            )}
            {/* Paywalled Personalized Itinerary */}
            {pages[item] === 2 && (
              <div id="paywall" className='flex flex-col justify-center items-center gap-y-4'>
                <h1 id="personalizedtitle">See your Personalized Itinerary</h1>
                <h3 id='subprice'>Subscribe for $x / month</h3>
                <div id='paymentoptions' className='flex flex-col justify-center items-center rounded-xl p-4'>
                  <div id="paymentdiv" className='flex flex-row justify-evenly items-center'>
                    <button id='paypal' className='flex flex-col justify-center items-center' disabled={disablebuttons}>
                      <IoLogoPaypal size={50} />
                      <p>Paypal</p>
                    </button>
                    <button id='venmo' className='flex flex-col justify-center items-center' disabled={disablebuttons}>
                      <IoLogoVenmo size={50} />
                      <p>Venmo</p>
                    </button>
                    <button id='creditcard' className='flex flex-col justify-center items-center' disabled={disablebuttons}>
                      <IoCard size={50} />
                      <p>Credit Card</p>
                    </button>
                  </div>
                  <button id='paybutton' className='buttons' onClick={() => setCurrentPage(currentPage + 1)}>
                    Complete Registration
                  </button>
                </div>
              </div>
            )}
            {/* Sucess Page */}
            {pages[item] === 3 && (
              <div className='flex flex-col items-center justify-center'>
                <h1 id="successtitle">Success!</h1>
                <button id='questsubmit' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white'
                  onClick={() => authfunc(true)}
                >
                  See Results
                </button>
              </div>
            )}
          </animated.div>
        )
      })}
    </div>
  );
};