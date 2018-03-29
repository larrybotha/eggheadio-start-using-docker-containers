# 04 - Manage data within docker volumes

https://egghead.io/lessons/tools-manage-data-within-docker-volumes?pl=docker-511c5e3f

- data in docker containers is by default ephemeral - when a container is
    stopped, you can expect the data to not persist
- to persist data, docker has the concept of *volumes*. A single volume can be
    used by multiple containers
- a volume can be created using the `volume create` command:

    ```bash
    $ docker volume create --name webdata
    ```

    To list all volumes:

    ```bash
    $ docker volume ls
    ```
- to run a container with a specific volume:

    ```bash
    $ docker run -d  --name web1 -v webdata:/usr/share/nginx/html -p 8000:80 nginx
    #            [1] [    2    ] [    3   ][          4         ] [    5   ]  [6]

    # 1 - run the container in the background
    # 2 - give it a name so that it's easy to reference
    # 3 - specify the name of the volume this container should run with
    # 4 - specify where this volume should be mounted inside the container.
    #     Nginx uses the /usr/share/nginx/html folder to serve files, so that's
    #     what we specify
    # 5 - expose the host to nginx inside the container via port 8000, and map
    #     that to the default nginx port of 80 (inside the container)
    # 6 - specify the name of the image this container will run
    ```

    We can now see this container running using `docker ps`.

    We can also validate that it's working usiong curl:

    ```bash
    $ curl localhost:8000
    # ... default nginx html is served
    ```
- with the `docker exec` command we can change contents of containers without
    entering them:

    ```bash
    # change the default html served by nginx in a running docker container
    $ docker exec web1 bash -c  'echo "foo" > /usr/share/nginx/html/index.html'
    #         [1]  [2]  [3] [4] [                      4                      ]
    # 1 - execute a command
    # 2 - in the container with this name
    # 3 - using this program
    # 4 - with the command flag of...
    # 5 - this command to execute inside the container
    ```

    The container has to be running in order to execute the command
- the container can then be stopped and removed:

    ```bash
    $ docker stop web1
    $ docker rm web1
    ```
- if we spin up a new container using that volume, we can see the same data:

    ```bash
    $ docker run -d --name web2 -v webdata:/usr/share/nginx/html -p 8000:80 nginx
    $ curl localhost:8000
    foo
    ```

    All containers using the `webdata` volume will show changes in the persised
    data.
- we can inspect a container using a format flag allowing us to inspect only the
    information related to volumes of that container:

    ```bash
    $ docker inpsect -f '{{ .Mounts }}' web2
    [{volume webdata /var/lib/docker/volumes/webdata/_data /usr/share/nginx/html local z true }]
    ```

    This shows the names mounted on a container, as well as the location and
    mount points of the volumes
- one can also inspect a volume directly:

    ```bash
    $ docker volume inspect webdata
    [
        {
            "CreatedAt": "2018-03-29T08:31:28Z",
            "Driver": "local",
            "Labels": {},
            "Mountpoint": "/var/lib/docker/volumes/webdata/_data",
            "Name": "webdata",
            "Options": {},
            "Scope": "local"
        }
    ]
    ```
- to remove a volume, stop all containers that are using that volume, and remove
    the containers too. The volume can then be removed.

    ```bash
    $ docker stop web2 && docker rm web2
    $ docker volume rm webdata
    ```
