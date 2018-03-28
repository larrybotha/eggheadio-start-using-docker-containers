# 03 - Download and remove docker images

https://egghead.io/lessons/tools-download-and-remove-docker-images?pl=docker-511c5e3f

- images can be downloaded using docker's `pull` command:

    ```bash
    # pull images from docker hub (the default)
    $ docker pull mongo
    ```
- by default the `latest` tag of an image is downloaded
- to download an image with a specific tag, append a colon and the name of the
    tag to the image:

    ```bash
    $ docker pull mongo:3.0
    ```
- we can list images using the `images` command:

    ```bash
    $ docker images
    ```
- to remove an image, use the `rmi` command with the image name:

    ```bash
    $ docker rmi some-image
    ```
- to remove an image with a specific tag, specify the tag name in the same way
    as when pulling an image:

    ```bash
    $ docker rmi mongo:3.0
    ```
- images can also be removed using their ids:

    ```bash
    $ docker rmi [image-id]
    ```
