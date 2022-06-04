import { render, screen } from '@testing-library/react';
import App from './App';
import { useData, useUserState } from './utilities/firebase';

jest.mock('./utilities/firebase');

test('shows Sign In if not logged in', () => {
  useData.mockReturnValue([[], true, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const button = screen.queryByText(/Sign In/i);
  expect(button).toBeInTheDocument();
});

const fakeUser = { 
  displayName: 'Joe', 
  uid: 'asdf', 
  joined_events: { 0: '1'} 
}

const mockEvents = {
  title: "HuddleMock",
  events: [
    {
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
    },
  ],
  users: {
    'asdf': {joined_events: []}
  }
};

test('shows Sign Out if logged in', () => {
  //useData.mockReturnValue([mockEvents, false, null]);
  useData.mockImplementation(
    (path) => {
      if(path == "/events") {
        return [mockEvents.events, false, null];
      } else if(path == "/users") {
        return [mockEvents.users, false, null];
      }
    }
  )
  useUserState.mockReturnValue([fakeUser]);
  render(<App></App>);
  const button = screen.queryByText(/Sign Out/i);
  expect(button).toBeInTheDocument();
});

test('retrieves fake event', () => {
  useData.mockImplementation(
    (path) => {
      if(path == "/events") {
        return [mockEvents.events, false, null];
      } else if(path == "/users") {
        return [mockEvents.users, false, null];
      }
    }
  )
  useUserState.mockReturnValue([fakeUser]);
  render(<App/>);
  const card = screen.queryByText(/Pickup Vball/i);
  expect(card).toBeInTheDocument();
});

// test('retrieves event from database', async () => {
//   render(<App />);
//   const card = await screen.findByText(/Pickup Spikeball/i);
//   expect(card).toBeInTheDocument();
// });