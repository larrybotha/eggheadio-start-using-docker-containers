# the image this image is based on
FROM kstaken/apache2

# LABEL adds metadata to images
LABEL name="clock-app"

# Commands to run on the image once it's available.
# This sets up the environment
RUN apt-get update && apt-get install -y php5 libapache2-mod-php5 php5-mysql php5-cli && apt-get clean && rm -rf /var/lib/apt/lists/*

# COPY our application to the location served by PHP inside the container
COPY clock.php /var/www

# NOtify consumers of this container that port 80 inside the container is
# exposed
EXPOSE 80

# The command to run once the environment is set up
CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"]
