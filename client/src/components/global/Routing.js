import React, {useContext, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../../App';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from '../../firebase.js';

import GuestHome from '../../screens/GuestHome';
import Results from '../../screens/Results';
import CheckIn from '../auth/CheckIn';
import People from '../../screens/People';
import Itinerary from '../../screens/Itinerary';
import SignupProcess from '../../screens/SignupProcess';
import LoginScreen from '../../screens/LoginScreen';
import Chat from '../../screens/Chat';
import UserHome from '../../screens/UserHome';

export default function Routing() {
  const {user, setUser} = useContext(AuthContext);
  const [authStateChanged, setAuthStateChanged] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (firstRender || authStateChanged) {
        setUser(user);
      }
    });

    setFirstRender(false);

    return () => unsubscribe();
  }, [authStateChanged, firstRender, setUser]);

  return (
    <Router>
      {user ?
        <Routes>
          <Route exact path='/' element={<UserHome authfunc={setAuthStateChanged} />} />
          <Route exact path='/results' element={<Results />} />
          <Route path="/chat/:recipientId" element={<Chat />} />
          <Route exact path='/people' element={<People />} />
          <Route exact path="/itinerary" element={<Itinerary />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      :
        <Routes>
          <Route exact path='/' element={<GuestHome />} />
          <Route exact path='/checkin' element={<CheckIn />} />
          <Route exact path='/signin' element={<LoginScreen authfunc={setAuthStateChanged} />} />
          <Route exact path='/signup' element={<SignupProcess authfunc={setAuthStateChanged} />} />
        </Routes>
      }
    </Router>
  );
};