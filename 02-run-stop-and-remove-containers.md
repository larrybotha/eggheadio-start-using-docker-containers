# 02 - Run, stop, and remove docker containers

https://egghead.io/lessons/tools-run-stop-and-remove-docker-containers?pl=docker-511c5e3f

- 2 ways to run containers
    1. `$ docker run [name-of-image]`
        
        e.g. `$ docker run mongo`

        If the image is not on your machine, it'll download it from Docker Hub
        before running it, otherwise pull it from your downloaded image cache.

        `$ docker run` will run the image in the foreground, logging any output.

        `ctrl-C` stops the container

    2. `$ docker run -d [name-of-image]`
        
        With the `-d` flag we run the image in the background.
- Listing containers
    ```bash
    # list running containers
    $ docker ps
    ```
- Stopping containers
    ```bash
    # stop the container matching an id obtained from running `docker ps`
    $ docker stop [container-id]
    ```

    Stopping a container doesn't remove it.

- We can view all containers on the system by adding a `-a` flag to the `ps` command:
    ```bash
    $ docker ps -a
    ```
- Starting containers
    ```bash
    $ docker start [container-id]
    ```
- Removing containers
    ```bash
    $ docker rm [container-id]
    ```

    A container can only be removed once it's stopped
