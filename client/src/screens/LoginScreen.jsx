import React, {useContext, useState} from 'react';
import { AuthContext } from '../App.jsx';
import { sendPasswordResetEmail  } from 'firebase/auth';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginScreen({ authfunc }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useContext(AuthContext);

  return (
    <div className='parentdiv'>
      <button id='homebutton' onClick={() => navigate('/')}>Back to Home</button>
      <h1 id='loginacc'>Log In</h1>
      <div id='logindiv' className='flex flex-col justify-center items-center'>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email-address"
          autoCapitalize="none"
        />
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='!mb-0'
        />
        <button className='buttons' onClick={() => {login(email, password); authfunc(true)}}>Sign In</button>
      </div>
      <button className='buttons' onClick={async() => {
        if (email === "") {
          toast.error("Please enter a valid email.", {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
          });
        } else {
          await sendPasswordResetEmail(auth, email)
            .then(() => {
              if (email.includes('@') && email.includes('.com')) {
                toast.info("Your password reset has been sent to your email!\nMake sure to check spam.", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              } else{
                toast.error("Please enter a valid email.", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              }
            })
            .catch(e => {
              if (e.code === 'auth/invalid-email'){
                toast.error("Please enter a valid email.", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              } else if (e.code === 'auth/user-not-found'){
                toast.error("No user found with that email.", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              }
            })
        }
      }}>
        Forgot Password?
      </button>
      <p className='text-center mt-4 text-lg'>Don't already have an account?</p>
      <button className='buttons' onClick={() => navigate('/signup')}>
        Sign Up
      </button>
    </div>
  );
};