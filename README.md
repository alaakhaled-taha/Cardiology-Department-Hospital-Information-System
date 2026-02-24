
# Cardiology Department Hospital Information System

This repository contains a full-stack web application with a React + Vite frontend and a Node.js + Express backend using Sequelize for PostgreSQL.

Purpose: Manage patients, doctors, appointments, medical records, and test results for a cardiology department.

Key Features:
- User authentication (doctors and patients)
- Profile and medical record management
- Appointment booking and listing
- Upload and store test results and files

Project Structure (short):
- `client/` — frontend application (React + Vite)
- `server/` — API server (Express, Sequelize, PostgreSQL)
- `assest/` — screenshots and project images
- `uploads/` — uploaded files

Project screenshots

![Screenshot 1](assest/Screenshot%202026-02-24%20013532.png)
![Screenshot 2](assest/Screenshot%202026-02-24%20013605.png)
![Screenshot 3](assest/Screenshot%202026-02-24%20013617.png)
![Screenshot 4](assest/Screenshot%202026-02-24%20013700.png)

Run locally

1) Install dependencies from the repository root (recommended):

```bash
npm install
```

2) Start both frontend and backend together (from project root):

```bash
npm run dev
```

Run individually

- Start backend only:

```bash
cd server
npm install
npm start
```

- Start frontend only:

```bash
cd client
npm install
npm run dev
```

Important notes
- The `.env` file should contain sensitive settings (DB connection, JWT secret). Do not commit it.
- Sequelize is configured for PostgreSQL. Create the database and update connection settings in `.env` before starting.

Contributing
- For fixes or improvements, please open an Issue or create a Pull Request.

Quick file references
- Server entry: `server/server.js`
- Frontend entry: `client/src/main.jsx`

--------------------------------------------------
© Cardiology Department Hospital Information System

