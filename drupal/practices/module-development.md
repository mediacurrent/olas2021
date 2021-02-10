The following best practices can guide you in your module development process:

# Use the `custom` subdirectory

Profiles, modules, and themes should all take advantage of Drupal's support for custom subdirectories. Modules installed with composer will automatically be placed in their respective `contrib` directories, so custom code can be placed in one of the following locations, depending on what it is:

- `profiles/custom/<profile_name>`
- `modules/custom/<module_name>`
- `themes/custom/<theme_name>`

# Use prefixes for custom modules

To avoid hook namespace collisions with current and future contributed modules, you should prefix custom modules, profiles, and themes with your project name. For instance, if your project name is `olas`, you could create the following:

- `profiles/custom/olas_profile` - Install profile for the project.
- `modules/custom/olas_api_connector` - Custom API connector required by the Olas project.
- `modules/custom/olas_migrate` - Module to handle migrations for the project.
- `themes/custom/olas_theme` - Custom theme for the Olas project.

# Enable error output on local environments

For local environments such as DDEV, it can be helpful to enable full error reporting. In your `settings.local.php`, add the following to output error messages in the browser in addition to normal logging:

```php
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
```

While this can be very helpful for local environments, it should never be enabled on publicly accessible environments such as production.

# Keep the ".module" file lightweight

Your modules' `<module_name>.module` file will be loaded on every HTTP request if it's enabled. In addition, the file is oriented around procedural code, while Drupal 8 can leverage object-oriented code much more thoroughly than Drupal 7 was able to. In many cases you'll have to place code in the module file due to needing to use Drupal's hooks, but when possible, it's often better to place your code in the `src` directory of the module in a class that's invoked automatically by Drupal or as a service.

# Create an info.yml file, and follow the latest structure for it

Modules should have an `<module_name>.info.yml` file that follows the [latest standards]() for how they're structured. For example:

```yaml
name: Hello World Module
description: Creates a page showing "Hello World".
package: Custom

type: module
core: 8.x

dependencies:
  - drupal:link
  - drupal:views
  - paragraphs:paragraphs
  - webform:webform (>=8.x-5.x)

test_dependencies:
 - drupal:image

configure: hello_world.settings

php: 5.6

hidden: true
required: true

# Note: do not add the 'version' or 'project' properties yourself if this is a contributed module.
# They will be added automatically by the packager on drupal.org.
# version: 1.0
# project: 'hello_world'
```