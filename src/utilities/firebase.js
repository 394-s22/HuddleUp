import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';

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