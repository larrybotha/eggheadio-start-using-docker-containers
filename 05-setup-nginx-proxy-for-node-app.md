# 05 - Setup an nginx proxy for a node app

https://egghead.io/lessons/node-js-setup-an-nginx-proxy-for-a-node-js-app-with-docker?pl=docker-511c5e3f

 - we start with a small [node app](./05-app/node/index.js)
 - we add a Dockerfile containing instructions for building an image for our
     container.

     Commands are run sequentially, and each command is run in an intermediate
     container. This is logged when building the image.

     Commands are case-insensitive, but convention is to UPPERCASE them.

    ```
    # FROM must be the first instruction in a Dockerfile
    # FROM specifies the base image from which an image will be built
    FROM mhart/alpine-node

    # COPY has the format:
    # COPY <src> <dest>
    # Files are copied from the host src to the provided destination inside the
    # container
    # The path of the source files is relative to the context of the build
    # (defined when running the build command that will create the image).
    COPY index.js .

    # EXPOSE informs Docker that the container listens on the specified ports at
    # runtime
    # THis does not publish the port - it is a type of documentation for the
    # person who will be running the container - "This container exposes port 3000"
    # -p is still responsible for publishing the port when using `docker run`
    EXPOSE 3000

    # There can only be one CMD instruction in a Dockerfile
    # CMD provides defaults for an executing container
    # Only the last CMD will take effect
    CMD node index.js
    ```
- Dockerfiles are used to build images along with a context. A build's files are
    located by a specified context, that being `PATH`, `URL`, or `-`. A build
    can then reference files in the context, such as with `COPY`. _All_
    files at the provided context get sent to the Docker deamon in order for an
    image to be built - not only the files used in the `COPY` command inside the
    Dockerfile. `.dockerignore` can be used to ignore files from the context and
    thus reduce the size of the uploaded context.

    The `build` command has the following syntax:

    ```bash
    $ docker build [OPTIONS] PATH | URL | -
    ```

    We can build an image, using a tag to make it easier to reference, using the
    current directory as the context for the image:

    ```bash
    $ docker build -t foo/node  .
    #         [1]  [    2    ] [3]
    # 1 - use docker's 'build' command to build an image from a Dockerfile.
    #     Because we're not specifying a Dockerfile, it looks for one in the
    #     current directory
    # 2 - build the image with the provided tag. We can reference docker to run
    #     this image using foo/node once it's built
    # 3 - the context for the image will be the current folder
    ```

    Once built, we can run a container using that image:

    ```bash
    $ docker run -d  -p 3000:3000 --name node-app foo/node
    #            [1] [     2    ] [       3     ] [   4  ]
    # 1 - run as a background daemon
    # 2 - publish 3000 from the container (2nd value) to be accessible via 3000
    #     on the host machine (first number)
    # 3 - name this container so it can be referenced later. After stopping this
    #     container we can start it with:
    #     docker run node-app
    # 4 - run this container using the image foo/node that we built
    ```

    We can see which images are on the system using:

    ```bash
    $ docker images
    ```

    and remove an images using:

    ```bash
    $ docker rmi [image-name]
    ```
- Before creating the proxy, let's test that we can get nginx running:

    ```bash
    $ docker run --rm  -p 8000:80 nginx
    #            [ 1 ] [    2   ]  [3]
    # 1 - remove this container when it's stopped
    # 2 - map 8000 on the host to 80 in the container - nginx's default port
    # 3 - run this container using the latest nginx image
    ```

    Because we're using this container as a proxy, we won't be copying files
    into it.
- A proxy has been created in `./05-app/nginx`. We create a default config for
    nginx with a `proxy_pass` to proxy all requests, and we create a Dockerfile
    which, using the default nginx image, copies that config into a specified
    location inside the image so that the container will run with our nginx
    config instead of the default.

    We then build an image with the tag `foo/nginx` from that Dockerfile:

    ```bash
    $ cd 05-app/nginx
    $ docker build -t foo/nginx .
    ```
- Now that we have an image for the proxy (tagged `foo/nginx`) we run a
    container using it as the base image.

    ```bash
    $ docker run -p 8000:80 --link node-app:app --name nginx-proxy foo/nginx
    #            [    1   ] [        2        ] [        3       ] [   4   ]
    # 1 - create a container binding 8000 on the host to 80 in the container
    #     (nginx's default)
    # 2 - link the currently running 'node-app' to this container, giving it
    #     an alias of 'app'. The alias is the same as the
    # 3 - give the container a name so we can use `docker start nginx-proxy`
    #     later, or reference the container elsewhere
    # 4 - run this container using the foo/nginx image
    ```

    With the `node-app` container running, and the `nginx-proxy` container
    running, we can access the app via `localhost:3000` directly, or via the
    proxy at `localhost:8000`
