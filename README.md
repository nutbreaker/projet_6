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

## Git Submodule (Backend Setup)

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

## Docker

You can easily run the application (both frontend and backend) using Docker Compose.

### Run containers

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
