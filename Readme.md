# Real-Time Chat Application

A real-time chat app built with **React**, **Node.js/Express**, **Socket.io**, and **MongoDB**. Users can join with a username, send and receive messages instantly, and view chat history after refreshing.

---

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Vite), Axios, Socket.io-client |
| Backend    | Node.js, Express                     |
| Real-time  | Socket.io                            |
| Database   | MongoDB (Atlas)                      |
| Deployment | Vercel (frontend), Render (backend)  |

---

## Folder Structure

```
chat-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection setup
│   │   │
│   │   ├── models/
│   │   │   └── Message.js             # Mongoose schema for chat messages
│   │   │
│   │   ├── controllers/
│   │   │   └── messageController.js   # REST handler logic (get/create messages)
│   │   │
│   │   ├── routes/
│   │   │   └── messageRoutes.js       # /api/messages route definitions
│   │   │
│   │   ├── sockets/
│   │   │   └── socketHandler.js       # All Socket.io event listeners (connect,
│   │   │                              # send_message, typing, disconnect, etc.)
│   │   │
│   │   └── app.js / server.js          # App entry point — wires Express + HTTP
│   │                                   # server + Socket.io together
│   │
│   ├── .env                           # Local environment variables (not committed)                  # Template for required env vars
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UsernamePrompt.jsx     # Dummy login screen (username only)
│   │   │   ├── MessageList.jsx        # Renders chat history + live messages
│   │   │   └── MessageInput.jsx       # Text input, send button, typing events
│   │   │
│   │   ├── hooks/
│   │   │   └── useSocket.js           # (optional) custom hook wrapping socket
│   │   │                              # connection lifecycle
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                 # Axios instance + REST calls
│   │   │   └── socket.js              # Socket.io client instance
│   │   │
│   │   ├── App.jsx                    # Root component — ties state, sockets,
│   │   │                              # and components together
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles
│   │
│   ├── .env                           # Local environment variables (not committed)
│   ├── .gitignore
│   ├── index.html
│   └── package.json
│
└── README.md
```

### Why this structure

- **`config/`, `models/`, `controllers/`, `routes/`, `sockets/` are separated on the backend** so REST logic and real-time logic never get tangled — each file has one responsibility, which keeps error handling and debugging isolated to a single layer.
- **`services/` on the frontend** centralizes the Axios instance and Socket.io client so no component talks to the network directly — components only call functions from `services/`, making it easy to swap URLs (local vs. deployed) from one place.
- **`components/` stays presentation-focused**; state and socket event wiring live in `App.jsx`, keeping individual components easy to read and reuse.

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas cluster (or local MongoDB instance)
- npm

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd chat-app
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Fill in `.env` with your own values (see [Environment Variables](#environment-variables) below), then start the server:
```bash
npm run dev
```
Backend runs on `http://localhost:5000` by default.

### 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
```
Create a `.env` file in `frontend/` (see below), then run:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173` by default.

### 4. Open the app
Visit `http://localhost:5173` in two separate browser tabs, join with two different usernames, and send messages between them to see real-time delivery.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable       | Description                                  | Example                              |
|----------------|-----------------------------------------------|---------------------------------------|
| `PORT`         | Port the Express server runs on               | `5000`                                |
| `MONGODB_URI`  | MongoDB Atlas connection string                | `mongodb+srv://user:pass@cluster.../chatdb` |
| `CLIENT_URL`   | Frontend origin, used for CORS + Socket.io CORS | `http://localhost:5173`               |

### Frontend (`frontend/.env`)
| Variable            | Description                       | Example                          |
|---------------------|-------------------------------------|-----------------------------------|
| `VITE_API_URL`      | Backend REST API base URL           | `http://localhost:5000/api`       |
| `VITE_SOCKET_URL`   | Backend Socket.io server URL        | `http://localhost:5000`           |

For production, update both `.env` files (or your hosting platform's environment variable settings) to point at the deployed backend/frontend URLs instead of `localhost`.

---



> Note: the backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 30-50 seconds to respond.

---

## API Reference

| Method | Endpoint          | Description                        |
|--------|-------------------|--------------------------------------|
| GET    | `/api/messages`   | Fetch full chat history, oldest first |
| POST   | `/api/messages`   | Create a new message (`{ username, text }`) |

## Socket.io Events

| Event               | Direction        | Payload                     | Purpose                                |
|----------------------|------------------|-------------------------------|------------------------------------------|
| `send_message`       | client → server  | `{ username, text }`          | Send a new message                      |
| `receive_message`    | server → client  | saved message object          | Broadcast new message to all clients    |
| `typing`              | client → server  | `username`                    | Notify others a user is typing          |
| `user_typing`         | server → client  | `username`                    | Show typing indicator                   |
| `stop_typing`          | client → server  | —                              | Clear typing state                      |
| `user_stopped_typing`  | server → client  | —                              | Hide typing indicator                   |
| `user_count`           | server → client  | number                        | Current count of connected users        |
| `error_message`        | server → client  | string                        | Surface socket-layer errors to the UI   |

---

## Design Decisions

- **React over React Native:** prioritized delivering a fully working, real-time-correct app within the deadline. The submission guidelines explicitly accept a screen recording in place of an APK, so this was a low-risk trade-off. The component structure is portable to React Native later if needed.
- **JavaScript over TypeScript:** kept to plain JS to avoid adding a second learning curve on top of Socket.io within a tight timeline; folder structure is straightforward to migrate to TS later.
- **Save-then-broadcast pattern:** every message is written to MongoDB *before* being broadcast via Socket.io. This guarantees the REST-fetched chat history and the live socket feed are always consistent — no message ever appears live but is missing after a refresh, or vice versa.
- **Username-based dummy auth:** username stored in `localStorage`, no password or backend session. Sufficient for the assignment's scope; not intended as real authentication.
- **Single global chat room:** no rooms, channels, or private DMs — everyone connected shares one conversation.

---

## Assumptions

- Only one chat room exists; there's no multi-room or private messaging support.
- Messages cannot be edited or deleted once sent.
- Usernames are not unique or verified — two users could join with the same name.
- The app assumes a reasonably small number of concurrent users (no message pagination implemented on chat history yet).

---

## Bonus Features Implemented

- [x] Username-based dummy login
- [x] Typing indicator
- [x] Online user count
- [x] Messages persisted in MongoDB
- [x] Backend deployed (Render)

---

## Author

Satyam