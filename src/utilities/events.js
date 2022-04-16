import { pushData } from "../utilities/firebase";

export const createEvent = (title, description, sport, host, location, min_players, max_players,
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
    
}