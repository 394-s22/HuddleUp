import { useState, render, useRef } from 'react';
import { useUserState } from '../utilities/firebase';
import { useData, setData, pushData } from "../utilities/firebase";

// const gameRef = push(ref(database, 'games'), {
//     date: '5/9/2019'
//     teams: ['Cincinnati Reds', 'Oakland Athletics'],
//     score: [3, 0]
//   });

const uniqueID = () => {
    
}

const createEvent = (title, description, sport, host, location, min_players, max_players,
    current_players, date, start_time, end_time) => {

    }