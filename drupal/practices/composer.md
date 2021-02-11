# Composer

Drupal 8 and 9 projects should be managed using composer rather than manually installed files. Drupal.org has excellent documentation on how to create a project using composer [here](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies).

## Installing Drupal Core with Composer

To build a project with composer using Drupal core and no other libraries/modules, you can run the following in your terminal:

```bash
composer create-project drupal/recommended-project my_site_name_dir
```

Once you have the project installed, you can cd into your new project's directory and run `ddev config` to get a DDEV local environment running, assuming you have DDEV installed.

## Adding New Modules

New modules can be installed with composer using:

```bash
composer require drupal/module_name
```

For example, `composer require drupal/migrate_plus`. You can also install specific versions using semantic version constraints, such as `composer require drupal/migrate_plus:~4.0`

## Adding Drush

As of Drush 8, the recommended way of using Drush is to have a project-specific version of it installed in the composer.json for the project. The `drupal/recommended-project` package used to create the project doesn't include drush, so you'll want to add the following to the "require" section of composer.json:

```javascript
"drush/drush": "^9.7.1 | ^10.0.0"
```

After that's in place, delete your `composer.lock` file and run `composer update` to add Drush to the project.

## Updating modules

All packages in the project can be updated with the following command:

```bash
composer update
```

If you need to update a specific module, such as updating only Drupal core, you can run a more specific command:

```bash
composer update drupal/core --with-dependencies
```

If you're unable to update a module that has a new version, you likely have a version constraint that's preventing it. For example, if a module has an 8.x-3.0 release you're attempting to install but are currently on the `~2.0` constraint, you'll be unable to update to the new major version. In this scenario, you can instead require the new version:

```bash
composer require drupal/module_name:~3.0
```

After doing so, the module should be reinstalled as the new version. Using this method often requires several attempts to get it fully working, as you may have other dependencies that need to be removed from composer.json before it will work due to the major version change.

## Applying Patches

As a rule, you should never hack Drupal core or contributed modules. Using composer to install them makes that impossible, which is one of the benefits of using it. However, occasionally you'll need to patch core or a contributed module to include a specific issue fix that isn't in a generally available release yet.

To handle patches with composer, you'll need to require the following library:

```bash
composer require cweagans/composer-patches
```

Once that's in place, add the following inside the `"extra"` property in your composer.json file:

```javascript
"composer-exit-on-patch-failure": true,
"patchLevel": {
  "drupal/core": "-p2"
},
"patches": {
  "drupal/core": {
    "1356276 - Allow profiles to provide a base/parent profile and load them in the correct order": "https://www.drupal.org/files/issues/2019-12-02/core-1356276-598-89x.patch",
  },
}
```

You can replace the patches section with the appropriate patches that you need to install. Each module that you're patching should have its own key that matches its composer dependency name, and the value should be an object where the key is a helpful label and the value is a URL to the patch \(or direct file path, if it's in your repo\).

