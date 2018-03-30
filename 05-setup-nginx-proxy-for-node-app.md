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
