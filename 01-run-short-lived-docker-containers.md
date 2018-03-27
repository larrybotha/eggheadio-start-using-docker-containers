# 01 - Run short-lived docker containers

https://egghead.io/lessons/tools-run-short-lived-docker-containers

- containers are usually run as background daemons using the `-d` flag:

    ```bash
    $ docker run -d nginx
    # docker id stdout'd

    # show running docker processes
    $ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
    0621c9e2c64a        nginx               "nginx -g 'daemon off"   3 minutes ago       Up 3 minutes        80/tcp              adoring_nightingale
    ```

    The actively running command is `nginx -g 'deamon off'`
- Docker containers automatically shut down when the running command exits
- If we don't know what something in the running command does, we can get that
    info by running a short-lived container running docker with the `--rm` flag,
    and specifying the command we want docker to run:

    ```bash
    docker run --rm nginx nginx -h
    ```

    What happened here is that docker created the container, ran the command
    `nginx -h`, and then terminated and removed the container.
- We can get container information and write it to the host system:

    ```bash
    docker run --rm debian hostname >> /tmp/containers
    ```

    Running `hostname` from within docker will print out the container's id.
    `>> /tmp/containers` appends the result to the `/tmp/containers` file on our
    host machine.

    `cat`ing that file will show that the file was written to.
- This can be added as a cron job:

    ```bash
    $ crontab -e
    * * * * * /usr/local/bin/docker run --rm debian hostname >> /tmp/containers
    ```

    The above command will write a container id to the host system every minute,
    using short-lived containers
