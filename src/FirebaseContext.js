import {createContext, useContext, useState, useEffect} from 'react';
import {FIREBASE_AUTH} from './config/firebaseinit';
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
                await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
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