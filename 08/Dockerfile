# specify the image to use a base
# Use the official node image, specifying we want hte 9.9.0 tag always
FROM node:9.9.0

# Best practises specify setting NODE_ENV in the Dockerfile
ENV NODE_ENV=production

# Don't run Docker using the unsecure root user - use the user 'node' provided
# by the official Node image we're using
USER node
