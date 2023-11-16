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
        signUp: async (email, password, phone, address) => {
            try {
                await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
                .then((data) => {
                    const dataDump = {
                        username : email.match(/([^@]*)@/)[1],
                        phone : phone,
                        address : address,
                        pict : "https://firebasestorage.googleapis.com/v0/b/photoinstamaxsemarang.appspot.com/o/profile%2F726e5ff73caaef10c1a8a7f473547638.png?alt=media&token=af255546-69b0-420c-8acd-6fd541416a1d",
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