import React, {createContext, useState} from 'react';
import Routing from './components/global/Routing.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth, db} from './firebase.js';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './assets/css/home.css';

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            toast.success("Signed in!", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored",
            });
            return true;
          })
          .catch(error => {
            if (error.code === "auth/invalid-email") {
              toast.error("The email address is invalid.", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
            }
            if (error.code === "auth/user-not-found") {
              toast.error("There is no user account linked to this email!", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
            }
            if (error.code === "auth/wrong-password") {
              toast.error("Incorrect password! Please try again.", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
            }
            if (error.code === "auth/user-disabled") {
              toast.error("This user is currently disabled.", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
            } else if (error.code === "auth/missing-email") {
              toast.error("Please enter an email address.", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
            } else if (error.code === "auth/missing-password") {
              toast.error("Please enter a password.", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
            }
            console.error(error);
            return false;
          });
        },
        register: async (email, password) => {
          await createUserWithEmailAndPassword(auth, email, password)
            .then(async () => { 
              toast.success("Signed in!", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
              return true;
            })
            .catch(error => {
              if (error.code === "auth/email-already-in-use") {
                toast.error("The email address is already in use!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              }
              if (error.code === "auth/invalid-email") {
                toast.error("The email address is invalid!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              }
              if (error.code === "auth/operation-not-allowed") {
                toast.error("Sorry, you can't do that right now.", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              }
              if (error.code === "auth/weak-password") {
                toast.error("Please create a stronger password.", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored",
                });
              }
              console.error(error);
              return false;
            });
        },
        logout: async () => {
          await signOut(auth)
            .then(() => 
              toast.success('Signed out!', {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              })
            )
            .catch((error) => {
              toast.error(error, {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored",
              });
            });
        },
      }}
    >
      <Routing />
      <ToastContainer />
    </AuthContext.Provider>
  );
};