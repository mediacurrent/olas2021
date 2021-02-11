# Drush

Drush is a command line utility that can be used for a variety of tasks related to maintaining a Drupal site, such as:

* Rebuilding the cache
* Enabling or uninstalling modules
* Logging in as any user
* Running commands provided by contrib or custom modules
* Importing and exporting site configuration
* Importing and exporting the site database
* Executing a MySQL CLI connection to run arbitrary commands

## Installing Drush

As mentioned in the previous **Composer** section, drush should be installed for the project via composer using a command such as:

```bash
composer require drush/drush:"^9|^10"
```

The above command will require drush and allow for either version 9 or version 10 to be considered acceptable versions of Drush.

## Using Drush

Drush aliases can be configured to allow you to connect to Drush on your hosting environment. For example, if your project root has a `drush` directory \(beside the `web` docroot, not inside it\) you can add a `drush.yml` file inside that directory similar to the following:

```yaml
prod:
  host: prod.domain.com
  user: www-user
  root: /path/to/drupal
  uri: https://www.example.com

stage:
  host: stage.domain.com
  user: www-user
  root: /path/to/drupal
  uri: https://stage.example.com
```

If drush is also installed on the host, you'll be able to use aliases such as `drush @sitename.prod` to execute commands on that environment, such as `drush @sitename.prod cr` to rebuild the cache.

## Using Drush with DDEV

If you're using the DDEV local environment, it includes special commands to execute Drush through the Docker web container:

```bash
ddev exec drush <command>
ddev . drush <command>
```

You can use `ddev exec` to execute ssh commands in the web container, including the built-in drush command. The `exec` portion can also be replaced with `.` as a shorthand. For a complete example, rebuilding the site cache in DDEV would look like `ddev . drush cr`.

## Enabling / Disabling Modules

Modules can be enabled with `drush en <module_name>` and uninstalled with `drush pmu <module_name>`.

## Configuration Management

Assuming configuration management has been enabled and configured for the project \(see the upcoming Configuration Management section\), you can import and export the entire site configuration with `drush cim` to import config, or `drush cex` to export config. Config importing and exporting behaves similar to the revert all or update all commands in the Features module for Drupal 7.

