A key change in Drupal 8 was that [Configuration Management](https://www.drupal.org/docs/configuration-management) was added to allow developers to store all of a site's configuration in code rather than exclusively in the database.

# Setting Up Configuration Management

Drupal 8 and 9 come with Configuration Management built-in as a core feature. To enable configuration synchronization, add the following to your settings.php file:

```php
$settings['config_sync_directory'] = 'path/to/config/sync';
```

## Where to Place the Config Sync Directory

If you're using a custom install profile, you can place the config directory inside it, such as `profiles/custom/my-profile/config/sync`, and then point the `config_sync_directory` setting in settings.php to reference that path. Another recommended location is `sites/default/config/sync` if you're not using an install profile.

If you would prefer to have it outside of the web root, you could place it beside your `web` docroot and then reference it in settings.php as `../config/sync`.

## Importing and exporting configuration

Rather than using the UI, you can use drush to handle configuration if you have a config sync directory enabled.

- `drush cex` - Export configuration
- `drush cim` - Import configuration

# Best Practices

## 1. Never Make Configuration Changes on the Production Environment

Because configuration changes are tracked in code, configuration settings should not be modified on the production environment. Doing so will greatly increase the risk of losing those changes during the next deployment if they were not captured first in a commit to the codebase.

## 2. Use the _Config Ignore_ and _Config Split_ modules.

For frequently changed configuration that's not suitable for syncing (such as frequently changing blocks on the Block Layout page) or for sensitive info such as API keys, you can use the [Config Ignore](https://www.drupal.org/project/config_ignore) module to ignore that configuration so that it won't be imported.

Environments often need configuration unique to their setup, such as enabling logging on dev or stage environments. This can be accomplished by using the [Config Split](https://www.drupal.org/project/config_split) module to create and configure multiple configuration groups to handle different environments.

## 3. Always Export the Database Before Importing

On the production environment, you should always export a copy of the database before completing a deployment and importing the site's new configuration. In addition to the additional safety this provides for replacing the database outright, this will also allow you to pull down a copy of the database and create a hot fix release with any missing configuration changes without having to do a full rollback if time allows.

## 4. Avoid Editing Configuration Files By Hand

Configuration files can be edited by hand in cases where it's simple and clear to do so (such as modifying a label on a field), but because config management is essentially a flat file database, it's very easy to corrupt the configuration files in a way that's difficult to resolve without reverting to an earlier commit. If you do modify a configuration file by hand, you should always test it by importing it locally to confirm it works as expected.

## 5. Use drush to import and export configuration

As described earlier, use Drush to handle your config synchronization rather than the UI.

## 6. Avoid Changing Configuration in a Module's config/install Directory

The `config/install` directory for a module is imported when the module is first installed. If you need to change configuration for a module after it has already been installed, it should be in your site's live configuration or handled via an install hook.