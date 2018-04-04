# 08 - Deploy NodeJs on Docker

https://egghead.io/lessons/node-js-deploy-node-js-on-docker?pl=docker-511c5e3f

- We've got a Dockerfile at [08/Dockerfile](./08/Dockerfile) from which an image
    will be built, and from which a container will then be created to run our
    application
- [Docker best practises](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
    can be found on NodeJs' Github account.
- Docker runs containers using the root user by default which is a security
    issue (why is that?). The NodeJs docs recommend running the container as an
    unprivileged user wherever possible. This used to have to be done by
    creating a `user` and `usergroup` manually, but the official NodeJs Docker
    images now provide a `node` user to do the heavy lifting.

    We can either run an image with the user:

    ```bash
    $ docker run ... -u node ... node:9.9.0
    ```

    or we can activate the user in the Dockerfile at the end:

    ```dockerfile
    FROM node:9.9.0

    # ... rest of your config

    USER node
    ```
- For our deployed app we need it to run in production mode. With Node apps this
    is done with the `NODE_ENV` environment variable. As per the best practises
    guide, we should set this in our Dockerfile:

    ```dockerfile
    ENV NODE_ENV=production
    ```

