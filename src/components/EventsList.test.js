import { render, fireEvent, screen } from '@testing-library/react';
import EventsList from './EventsList';
import { useData, useUserState } from '../utilities/firebase';

jest.mock('../utilities/firebase');

const fakeUser = {
    "displayName": 'Joe',
    "uid": 'asdf',
    "joined_events": []
}

const fakeEvent = {
    "id": "0",
    "title": "Pickup Vball",
    "description": "Casual Volleyball game open to players of all levels!",
    "sport": "Volleyball",
    "host": "Reese Back",
    "location": "Deering",
    "min_players": 6,
    "max_players": 12,
    "current_players": 7,
    "date": "2022-04-11",
    "start_time": "12:00",
    "end_time": "12:50",
}

const mockEvents = {
    title: "HuddleMock",
    events: {
        "0": fakeEvent,
    },
    users: {
        'asdf': fakeUser
    }
};

// Angel Hernandez
test('searching keyword in mockEvents', () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockEvents.events, false, null];
            } else if (path == "/users") {
                return [mockEvents.users, false, null];
            }
        }
    )
    useUserState.mockReturnValue([fakeUser]);
    render(<EventsList 
        events={mockEvents.events}
        searchText={"Vball"}
        userData={mockEvents.users}
        currentPage={""}
        filterCondition={""}
        />)
    const event = screen.queryByText(/casual/i);
    expect(event).toBeInTheDocument();
});

// Angel Hernandez
test('searching keyword not in mockEvents', () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockEvents.events, false, null];
            } else if (path == "/users") {
                return [mockEvents.users, false, null];
            }
        }
    )
    useUserState.mockReturnValue([fakeUser]);
    render(<EventsList 
        events={mockEvents.events}
        searchText={"Vball"}
        userData={mockEvents.users}
        currentPage={""}
        filterCondition={""}
        />)
    const event = screen.queryByText(/competitive/i);
    expect(event).not.toBeInTheDocument();
});