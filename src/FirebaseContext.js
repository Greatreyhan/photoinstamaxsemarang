import {createContext, useContext, useState, useEffect} from 'react';
import {FIREBASE_AUTH, FIREBASE_DB} from './config/firebaseinit';
import {set,ref} from "firebase/database"
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import 'firebase/auth';

const FirebaseContext = createContext();

export const useFirebase = () =>{
    return useContext(FirebaseContext);
}

export const FirebaseProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, authUser=>{
            if(authUser){
                setUser(authUser);
            }
            else{
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        signIn : async (email,password) =>{
            try{
                await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            }
            catch(err){
                console.error('Error Sign In', err);
            }
        },
        signUp: async (email, password) => {
            try {
                await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
                .then((data) => {
                    const dataDump = {
                        username : email.match(/([^@]*)@/)[1],
                        phone : "0",
                        address : "",
                        pict : "https://plus.unsplash.com/premium_photo-1688747278757-3e90d8b2e9b4?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGhpbmt8ZW58MHx8MHx8fDA%3D",
                        email : email
                      }
                      set(ref(FIREBASE_DB, "user/" + data.user.uid), dataDump)
                          .then(() => {
                          })
                          .catch((error) => {
                            console.log(error)
                          });
                  })
                  .catch((error) => {
                    console.log(error)
                  });
            } catch (error) {
              console.error('Error signing up:', error);
            }
        },
        signOut : async () =>{
            try{
                await signOut(FIREBASE_AUTH);
            }
            catch(err){
                console.error('Error Sign Out', err)
            }
        }
    }

    return(
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}