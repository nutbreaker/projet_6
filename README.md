# Sportsee

## Docker

- Run containers
  `sudo docker compose up` or `sudo docker-compose up micro-api`
- Delete images
  `sudo docker image rm -f sportsee-micro-api sportsee-frontend` 

## Git submodule

- Add submodule
  `git submodule add https://github.com/OpenClassrooms-Student-Center/P6JS.git backend`
- Clone the repository and initialize the submodules:
    `git clone --recurse-submodules git@github.com:nutbreaker/projet_6.git`
- If you have already cloned the repository without submodules, initialize them with:
    `git submodule update --init --recursive`
