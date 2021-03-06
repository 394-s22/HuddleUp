import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set, get, push } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDiAGCXA2xNxJDlycgAKtLp3EHfpmM0PTs",
  authDomain: "gatherup-6c940.firebaseapp.com",
  databaseURL: "https://gatherup-6c940-default-rtdb.firebaseio.com",
  projectId: "gatherup-6c940",
  storageBucket: "gatherup-6c940.appspot.com",
  messagingSenderId: "612352521954",
  appId: "1:612352521954:web:4bbb0a039864dbc861d0bb",
  measurementId: "G-ED8RFVLR20"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const pushData = (path, value) => (
  push(ref(database, path), value)
);

export const getData = async (path) => {
  const snap = await get(ref(database, path));
  if (snap.exists()) {
    return snap.val();
  } else {
    return null;
  }
};

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, setData, loading];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };


export const useUserState = (setUserData) => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  useEffect(() => {
    if (user) {
      setData(`/users/${user.uid}/id`, user.uid);
      setData(`/users/${user.uid}/displayName`, user.displayName);
    }

  }, [user]);

  return [user];
};