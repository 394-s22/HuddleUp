import { useData, setData, pushData } from "../utilities/firebase";

// const gameRef = push(ref(database, 'games'), {
//     date: '5/9/2019'
//     teams: ['Cincinnati Reds', 'Oakland Athletics'],
//     score: [3, 0]
//   });

// const uniqueID = () => {
//     // get .key from firebase push --> does this happen in firebase.js in pushData()
//     // or randomly generated number multiplied by Date.now
//     Math.floor(Math.random() * Date.now())
// }

const createEvent = (title, description, sport, host, location, min_players, max_players,
    current_players, date, start_time, end_time) => {

    const newEvent = 
    {
        "id": Date.now().toString(),
        "title": title,
        "description": description,
        "sport": sport,
        "host": host,
        "location": location,
        "min_players": min_players,
        "max_players": max_players,
        "current_players": current_players,
        "date": date,
        "start_time": start_time,
        "end_time": end_time,
    };

    pushData("/events", newEvent);
    // const pushRef = pushData("/events", newEvent);
    
}