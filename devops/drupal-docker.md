# Drupal + Docker

When using Drupal with Docker, it's helpful to think of every application dependency that's required to run Drupal as its own separate container. For example, there could be a `mariadb` container for running MySQL, a `php` container for running the application logic, and an `nginx` container to act as a frontend webserver. Additional containers are often helpful to have as well, such as containers for drush, cron, or mailhog.

## Wodby docker4drupal

Possibly the single best resource for running Docker in Drupal is Wodby's docker4drupal stack using docker-compose. It's not as convenient for developers as using an abstraction tool like DDEV or Lando, but it does give you an excellent view into the internals of what makes a good Drupal stack work well in Docker.

See the full repo here: [https://github.com/wodby/docker4drupal](https://github.com/wodby/docker4drupal)

Here's a trimmed down version of the docker4drupal compose file:

```yaml
version: "3.7"

services:
  mariadb:
    image: wodby/mariadb:$MARIADB_TAG
    container_name: "${PROJECT_NAME}_mariadb"
    stop_grace_period: 30s
    environment:
      MYSQL_ROOT_PASSWORD: $DB_ROOT_PASSWORD
      MYSQL_DATABASE: $DB_NAME
      MYSQL_USER: $DB_USER
      MYSQL_PASSWORD: $DB_PASSWORD

  php:
    image: wodby/drupal-php:$PHP_TAG
    container_name: "${PROJECT_NAME}_php"
    environment:
      PHP_SENDMAIL_PATH: /usr/sbin/sendmail -t -i -S mailhog:1025
    volumes:
    - ./:/var/www/html:cached

  crond:
    image: wodby/drupal-php:$PHP_TAG
    container_name: "${PROJECT_NAME}_crond"
    environment:
      CRONTAB: "0 * * * * drush -r /var/www/html/web cron"
    command: sudo -E LD_PRELOAD=/usr/lib/preloadable_libiconv.so crond -f -d 0
    volumes:
    - ./:/var/www/html:cached

  nginx:
    image: wodby/nginx:$NGINX_TAG
    container_name: "${PROJECT_NAME}_nginx"
    depends_on:
    - php
    environment:
      NGINX_STATIC_OPEN_FILE_CACHE: "off"
      NGINX_ERROR_LOG_LEVEL: debug
      NGINX_BACKEND_HOST: php
      NGINX_SERVER_ROOT: /var/www/html/web
      NGINX_VHOST_PRESET: $NGINX_VHOST_PRESET
    #      NGINX_DRUPAL_FILE_PROXY_URL: http://example.com
    volumes:
    - ./:/var/www/html:cached

    labels:
    - "traefik.http.routers.${PROJECT_NAME}_nginx.rule=Host(`${PROJECT_BASE_URL}`)"

  mailhog:
    image: mailhog/mailhog
    container_name: "${PROJECT_NAME}_mailhog"
    labels:
    - "traefik.http.services.${PROJECT_NAME}_mailhog.loadbalancer.server.port=8025"
    - "traefik.http.routers.${PROJECT_NAME}_mailhog.rule=Host(`mailhog.${PROJECT_BASE_URL}`)"

  traefik:
    image: traefik:v2.0
    container_name: "${PROJECT_NAME}_traefik"
    command: --api.insecure=true --providers.docker
    ports:
    - '8000:80'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

