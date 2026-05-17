# SportSee

![SportSee logo](/frontend/public/img/logo.png)

SportSee is a sports analytics dashboard application that allows users to track their fitness activity, daily calories.

## Tech Stack

- **Frontend:** React, React Router, Recharts, Vite
- **Backend:** Node.js (provided via a Git submodule)

## Prerequisites

- Node.js
- npm or yarn
- Docker (optional, but recommended to run the full stack easily)

## Quick Start

To get the project up and running quickly, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone --recurse-submodules git@github.com:nutbreaker/projet_6.git
   cd projet_6
   ```

2. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Start the application:**

   You can either start the frontend development server:
   ```bash
   npm run dev
   ```
   Or run the full stack using Docker:
   ```bash
   docker-compose --profile prod up
   ```

## Project Architecture

- **`frontend/app/app.css`**: Global stylesheet following
- **`frontend/app/components/`**: React visual components
- **`frontend/app/hooks/`**: Business logic and application state management
- **`frontend/app/services/`**: Data fetching
- **`frontend/app/utils/`**: Utility functions
- **`backend/`**: Node.js API provided via a Git submodule

## Miscellaneous

### Git Submodule (Backend Setup)

This project uses a Git submodule for the backend API.

- **Clone the repository and initialize the submodules at once:**

  ```bash
  git clone --recurse-submodules git@github.com:nutbreaker/projet_6.git
  ```

- **If you have already cloned the repository without submodules, initialize them with:**

  ```bash
  git submodule update --init --recursive
  ```

- *(Reference) Add the submodule:*
  `git submodule add https://github.com/OpenClassrooms-Student-Center/P6JS.git backend`

### Docker

You can easily run the application (both frontend and backend) using Docker Compose.

#### Run containers

Depending on your environment or Docker Compose version, you can start the project with:

```bash
docker compose up
# Or run specific services and profiles:
docker-compose up micro-api
docker-compose --profile dev up
docker-compose --profile prod up
```

### Delete images

To clean up your local environment and remove the project images:

```bash
sudo docker image rm -f sportsee-micro-api sportsee-frontend
```
