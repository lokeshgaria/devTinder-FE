# DevMatch (Dev Tinder) - Frontend Application

## Project Overview

DevMatch is a "Tinder-like" application for developers to connect with other developers. Users can swipe through developer profiles, send connection requests, manage received requests, and view their established connections.

## Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **State Management**: Redux Toolkit 2.11.2 + React Redux 9.2.0
- **Routing**: React Router 7.11.0
- **HTTP Client**: Axios 1.13.2
- **Styling**: TailwindCSS 4.1.18 + DaisyUI 5.5.14
- **Icons**: Lucide React 0.562.0

## Project Structure

```
src/
├── main.jsx              # Entry point with routing & Redux provider setup
├── App.jsx               # Main app component (Feed page wrapper)
├── AppLayout.jsx         # Layout component with Navbar
├── index.css             # Global styles
├── App.css               # App-specific styles
│
├── components/
│   ├── Feed.jsx              # Main swipeable card feed (Tinder-like UI)
│   ├── Navbar.jsx            # Navigation bar with user dropdown
│   └── ToastNotifications.jsx # Global toast notification system
│
├── pages/
│   ├── Login.jsx         # Login page with form validation
│   ├── Signup.jsx        # Registration page
│   ├── Profile.jsx       # User profile view/edit page
│   ├── Connections.jsx   # View established connections
│   └── Requests.jsx      # Manage incoming connection requests
│
├── hooks/
│   ├── useFeed.js        # Fetches developer feed for swiping
│   ├── useConnections.js # Fetches user's connections
│   └── useRequest.js     # Fetches and handles connection requests
│
└── utils/
    ├── axios.js          # Axios instance with interceptors
    ├── constants.js      # API URLs and connection request statuses
    ├── mockData.js       # Mock data for development
    ├── notifications.js  # Notification helper functions
    └── redux/
        ├── AppStore/
        │   └── store.js  # Redux store configuration
        └── feature/
            ├── userSlice.js         # User state management
            └── notificationSlice.js # Toast notifications state
```

## Routing Configuration

| Route          | Component           | Description                         |
|----------------|---------------------|-------------------------------------|
| `/`            | `App` (Feed)        | Main feed with swipeable cards      |
| `/login`       | `Login`             | User authentication                 |
| `/signup`      | `Signup`            | User registration                   |
| `/profile`     | `ProfilePage`       | View/edit user profile              |
| `/connections` | `ConnectionsPage`   | View established connections        |
| `/requests`    | `RequestsPage`      | Accept/reject connection requests   |

## State Management (Redux)

### Store Configuration (`store.js`)
```javascript
{
  user: userReducer,        // Current logged-in user data
  notification: notificationReducer  // Toast notifications
}
```

### User Slice (`userSlice.js`)
- **Actions**:
  - `addUser(payload)` - Sets user data after login
  - `removeUser()` - Clears user data (logout)

### Notification Slice (`notificationSlice.js`)
- **Actions**:
  - `addNotification({ type, message, duration, position })` - Shows toast
  - `removeNotification(id)` - Dismisses specific notification
  - `clearAllNotifications()` - Clears all notifications

## API Integration

### Axios Configuration (`axios.js`)
- **Base URL**: Uses `VITE_API_URL` environment variable or `/api` fallback
- **Credentials**: Always includes cookies (`withCredentials: true`)
- **Timeout**: 15 seconds
- **Interceptors**: 
  - Auto-redirects to `/login` on 401 Unauthorized
  - Shows error notification on auth failure

### API Endpoints Used

| Endpoint                          | Method | Description                    |
|-----------------------------------|--------|--------------------------------|
| `/login`                          | POST   | User authentication            |
| `/signup`                         | POST   | User registration              |
| `/logout`                         | POST   | User logout                    |
| `/profile`                        | GET    | Get current user profile       |
| `/profile/edit`                   | PATCH  | Update user profile            |
| `/feed?page=X&limit=Y`            | GET    | Get developer feed             |
| `/user/connections`               | GET    | Get user's connections         |
| `/user/requests/received`         | GET    | Get pending requests           |
| `/request/send/:status/:toUserId` | POST   | Send interested/ignored        |
| `/request/review/:status/:reqId`  | POST   | Accept/reject request          |

### Connection Request Statuses (`constants.js`)
```javascript
CONNECTION_REQUESTS = {
  ACCEPTED: "accepted",     // Accept incoming request
  REJECTED: "rejected",     // Reject incoming request
  INTERESTED: "interested", // Swipe right / Like
  IGNORED: "ignored"        // Swipe left / Pass
}
```

## Key Components

### Feed Component (`Feed.jsx`)
The main Tinder-like swiping interface:
- **Swipe Gestures**: Drag left/right to pass/like
- **Keyboard Shortcuts**: Arrow keys, A/D keys, Space for profile
- **Animations**: Card transitions, like/pass overlays
- **Tabs**: Skills, Bio sections on cards
- **Actions**: Pass (X), Like (Heart) buttons

### Navbar Component (`Navbar.jsx`)
- Displays app logo (DevMatch)
- Shows current user name and avatar
- Dropdown menu for Profile, Connections, Requests, Logout
- Auto-fetches user profile on mount if not in Redux

### Toast Notifications (`ToastNotifications.jsx`)
Global notification system with:
- Types: success, error, warning, info, loading
- Positions: top-right, top-left, bottom-right, bottom-left
- Auto-dismiss with progress bar
- Manual dismiss button

## Custom Hooks

### `useFeed()`
```javascript
const { feedList, loading } = useFeed();
// Fetches /feed?page=1&limit=10 on mount
```

### `useConnections()`
```javascript
const { connectionList, loading } = useConnections();
// Fetches /user/connections on mount
```

### `useRequest()`
```javascript
const { requestList, loading, handleRequestAction } = useRequest();
// Fetches /user/requests/received on mount
// handleRequestAction({ status, requestId }, setFn, setLoadingFn)
```

## Notification Utilities (`notifications.js`)

Helper functions for showing notifications:
```javascript
showSuccess("Message")   // Green success toast
showError("Message")     // Red error toast
showInfo("Message")      // Blue info toast
showWarning("Message")   // Yellow warning toast
dismissNotification(id)  // Manually dismiss
```

## User Data Structure

```javascript
{
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  photoUrl: string,
  about: string,
  age: number,
  gender: "male" | "female" | "other",
  skills: string[],
  profession: string  // Optional
}
```

## Environment Variables

Create a `.env` file with:
```
VITE_API_URL=http://localhost:3000/api
```

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Key Implementation Details

### Authentication Flow
1. User logs in via `/login` with email/password
2. Backend sets HTTP-only cookie for session
3. All subsequent requests include credentials
4. Navbar fetches `/profile` to populate Redux store
5. 401 responses trigger auto-redirect to login

### Feed/Swiping Flow
1. `useFeed` hook fetches developer profiles
2. User swipes or clicks Pass/Like buttons
3. API call to `/request/send/interested|ignored/:userId`
4. Success shows notification, advances to next card
5. Empty feed shows "All requests processed" message

### Connection Request Flow
1. `useRequest` hook fetches pending requests
2. User clicks Accept/Reject on request cards
3. API call to `/request/review/accepted|rejected/:requestId`
4. Request removed from list, notification shown

### Profile Editing Flow
1. ProfilePage reads user from Redux
2. Edit mode enables form inputs
3. Changes saved via PATCH `/profile/edit`
4. Redux store updated on success

## Styling Conventions

- **Theme**: Dark mode with gradient backgrounds
- **Colors**: Pink/Orange accent gradient for branding
- **Components**: DaisyUI classes (btn, card, input, etc.)
- **Utilities**: Tailwind for custom styling
- **Skill Tags**: Rotating gradient colors for visual variety

## File Naming Conventions

- Components: PascalCase (e.g., `Feed.jsx`, `Navbar.jsx`)
- Hooks: camelCase with `use` prefix (e.g., `useFeed.js`)
- Utilities: camelCase (e.g., `notifications.js`)
- Redux slices: camelCase with `Slice` suffix

## Notes for AI/LLM Development

1. **Backend Expected**: This is frontend-only; requires compatible backend API
2. **Cookie Auth**: Uses HTTP-only cookies, not JWT in headers
3. **Redux Required**: User state must be in Redux for Navbar to work
4. **Notifications**: Use utility functions, not direct dispatch
5. **Form Validation**: Each page handles its own validation
6. **Error Handling**: Axios interceptor handles 401; components handle other errors

