# specify the image to use a base
# Use the official node image, specifying we want hte 9.9.0 tag always
FROM node:9.9.0

# specify the home directory to be the same as the user we will define further down
ENV HOME=/home/node

# Best practises specify setting NODE_ENV in the Dockerfile
ENV NODE_ENV=production

# copy our package.json and package-lock.json into our app folder so that we can
# run npm install from inside the container
COPY package.json package-lock.json $HOME/app/

# The COPY command will copy the files as the root user. Our node user won't be
# able to access them. We have to change ownership of all files to ensure our
# user can run all files
RUN chown -R node:node $HOME/*

# Don't run Docker using the unsecure root user - use the user 'node' provided
# by the official Node image we're using
USER node

# Set the working directory to our home env var and app
# This is the same as what is configured in our docker-compose.yml
WORKDIR $HOME/app

# install our app deps
RUN npm install

# Launch our app
# The best practise guide recommends running the app directly as opposed to using
# npm start, as it prevents an extra process from being run
CMD ["node", "server.js"]
