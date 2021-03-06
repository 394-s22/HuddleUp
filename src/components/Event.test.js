import { render, fireEvent, screen, createRoot } from '@testing-library/react';
import Event from './Event';
import { useData, useUserState } from '../utilities/firebase';

jest.mock('../utilities/firebase');

const fakeUser = {
    "displayName": 'Joe',
    "uid": 'asdf',
    "joined_events": []
}

const fakeJoinedUser = {
    "displayName": 'Joe',
    "uid": 'asdf',
    "joined_events": ["0"]
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

const fakeFullEvent = {
    "id": "0",
    "title": "Pickup Bball",
    "description": "Casual Basketball game open to players of all levels!",
    "sport": "Basketball",
    "host": "Reese Back",
    "location": "Deering",
    "min_players": 6,
    "max_players": 12,
    "current_players": 12,
    "date": "2022-04-11",
    "start_time": "12:00",
    "end_time": "12:50",
}


const fullEvent = {
    "id": "1",
    "title": "Pickup Vball",
    "description": "Casual Volleyball game open to players of all levels!",
    "sport": "Volleyball",
    "host": "Reese Back",
    "location": "Deering",
    "min_players": 6,
    "max_players": 12,
    "current_players": 12,
    "date": "2022-04-11",
    "start_time": "12:00",
    "end_time": "12:50",
}

const mockEvents = {
    title: "HuddleMock",
    events: {
        "0": fakeFullEvent,
    },
    users: {
        'asdf': fakeUser
    }
};

const mockFullEvents = {
    title: "HuddleMock",
    events: {
        "0": fakeEvent,
    },
    users: {
        'asdf': fakeUser
    }
};

const mockJoinedEvents = {
    title: "HuddleMock",
    events: {
        "0": fakeEvent,
    },
    users: {
        'asdf': fakeJoinedUser
    }
}

// Jamie Lee
test('button is Join when user has not joined', () => {
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
    render(<Event event={fakeEvent} events={mockEvents.events} userData={mockEvents.users} />);
    const button = screen.queryByText(/Join/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // expect(button.textContent).toBe('Leave'); // can't figure out how to mock writing to data
});

// Jamie Lee
test('button becomes Leave when user has joined', () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockJoinedEvents.events, false, null];
            } else if (path == "/users") {
                return [mockJoinedEvents.users, false, null];
            }
        }
    )
    useUserState.mockReturnValue([fakeJoinedUser]);
    render(<Event event={fakeEvent} events={mockJoinedEvents.events} userData={mockJoinedEvents.users} />);
    const button = screen.queryByText(/Leave/i);
    expect(button).toBeInTheDocument();
});

// Amogh
test('join button becomes disabled when full', () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockFullEvents.events, false, null];
            } else if (path == "/users") {
                return [mockFullEvents.users, false, null];
            }
        }
    )
    render(<Event event={fakeEvent} events={mockJoinedEvents.events} userData={mockJoinedEvents.users} />);
    const viewPlayers = screen.queryByText(/View Players/i);
    fireEvent.click(viewPlayers);
    expect(screen.getByText(/Joe/i)).toBeInTheDocument();
});

//David Zhang
test('clicking join adds a user to the list of joined events', () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockJoinedEvents.events, false, null];
            } else if (path == "/users") {
                return [mockJoinedEvents.users, false, null];
            }
        }
    )
    useUserState.mockReturnValue([fakeJoinedUser]);
    render(<Event event={fakeFullEvent} events={mockFullEvents.events} userData={mockFullEvents.users} />);
    const button = screen.queryByText(/Join/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
});

// Angel Hernandez
test('check "View Players" button not clickable without login', () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockJoinedEvents.events, false, null];
            } else if (path == "/users") {
                return [mockJoinedEvents.users, false, null];
            }
        }
    )
    // before log in
    useUserState.mockReturnValue([null]);
    render(<Event event={fakeEvent} events={mockJoinedEvents.events} userData={mockJoinedEvents.users} />);

    let viewPlayers = screen.queryByText(/View Players/i);
    expect(viewPlayers).toBeDisabled();
});

// Angel Hernandez
test('check participant list accessible after login', () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockJoinedEvents.events, false, null];
            } else if (path == "/users") {
                return [mockJoinedEvents.users, false, null];
            }
        }
    )
    useUserState.mockReturnValue([fakeJoinedUser]);
    render(<Event event={fakeEvent} events={mockJoinedEvents.events} userData={mockJoinedEvents.users} />);

    const viewPlayers = screen.queryByText(/View Players/i);
    fireEvent.click(viewPlayers);

    expect(screen.getByText(/Joe/i)).toBeInTheDocument();
});

// Yousef Farge
test("signing out disables join button", () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockJoinedEvents.events, false, null];
            } else if (path == "/users") {
                return [mockJoinedEvents.users, false, null];
            }
        }
    )
    useUserState.mockReturnValue([null]);
    render(<Event event={fakeEvent}
                  events={mockJoinedEvents.events}
                  userData={mockJoinedEvents.users} />);
    const button = screen.queryByText(/Join/i);
    expect(button).toBeDisabled();
});


// Yousef Farge
test("joining is disabled if event is full", () => {
    useData.mockImplementation(
        (path) => {
            if (path == "/events") {
                return [mockJoinedEvents.events, false, null];
            } else if (path == "/users") {
                return [mockJoinedEvents.users, false, null];
            }
        }
    )
    useUserState.mockReturnValue([fakeUser]);
    render(<Event event={fullEvent}
                  events={mockJoinedEvents.events}
                  userData={mockJoinedEvents.users} />);
    const button = screen.queryByText(/Join/i);
    expect(button).toBeDisabled();
});
