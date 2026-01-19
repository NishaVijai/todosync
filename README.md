# TodoSync

## Description

**TodoSync** is a **modern, full-stack Todo application** built with **React, Node.js/Express, and MongoDB**.
It allows users to create, manage, filter, and persist tasks with a clean, accessible, and responsive user interface.

The project demonstrates **full-stack integration**, **React Context–based state management**, and proper handling of **asynchronous data loading** for a smooth user experience.

---

## Table of Contents

* [Preview](#preview)
* [Screenshot](#screenshot)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Overview](#overview)
* [Setup](#setup)
* [Project Structure](#project-structure)
* [Deployment](#deployment)
* [License](#license)

---

## Preview

[https://todosync-react.netlify.app/](https://todosync-react.netlify.app/)

---

## Screenshot

<img width="3840" height="4070" alt="TodoSync" src="https://github.com/user-attachments/assets/be737bbc-5a87-4932-966b-3e8f90dbb39d" />

---

## Features

* **Full CRUD Operations**
  Add, edit, delete, and mark tasks as completed.

* **Backend Synchronization**
  Tasks are persisted in MongoDB and synced via a RESTful API.

* **Task Filtering**
  View **All**, **Active**, or **Completed** tasks instantly.

* **Loading State Handling**
  Displays a clear loading indicator while fetching tasks from the backend, avoiding misleading empty states.

* **Single Source of Truth**
  Centralized state management using React Context API.

* **Accessibility & UX Focused**
  Keyboard navigation support and screen-reader friendly structure.

* **Responsive Design**
  Works seamlessly across desktop, tablet, and mobile devices.

---

## Overview

TodoSync is designed to be a **clean, efficient, and reactive task manager**.
It ensures tasks remain consistent across sessions by synchronizing frontend state with a backend API.

The app also demonstrates best practices such as:

* Async data fetching with loading states
* Clear separation of concerns
* Context-based global state management

---

## Tech Stack

### Frontend

* React
* Context API
* Hooks (`useState`, `useEffect`, `useContext`)
* PropTypes

### Backend

* Node.js
* Express

### Database

* MongoDB

### Other Tools

* Vite
* dotenv
* CORS

---

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd todosync
```

### 2. Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

### 3. Environment variables

Create a `.env` file in the **server** directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Create a `.env` file in the **client** directory:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the app locally

#### Start backend

```bash
cd server
npm run dev
```

#### Start frontend

```bash
cd client
npm run dev
```

Frontend will run at:
[http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
todosync/
│
├─ client/
│   ├─ src/
│   │   ├─ components/        # Form, Todo, FilterButton
│   │   ├─ context/           # TasksContext
│   │   ├─ utils/             # Custom hooks
│   │   ├─ App.jsx
│   │   └─ main.jsx
│   └─ vite.config.js
│
├─ server/
│   ├─ models/                # MongoDB schemas
│   ├─ routes/                # API routes
│   ├─ controllers/           # Request handlers
│   └─ server.js
│
└─ README.md
```

---

## Deployment

* **Frontend**: Deployed on **Netlify**
* **Backend**: Deployed on a Node.js hosting platform
* **Database**: MongoDB Atlas

To build the frontend:

```bash
npm run build
```

---

## License

This project is **open-source** and free to use for personal or educational purposes.
