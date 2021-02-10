The following best practices can guide you in your module development process. In addition, [Drupal.org has detailed documentation](https://www.drupal.org/docs/creating-custom-modules) on building custom modules.

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

# Avoid writing custom modules and code when possible

In general, it requires less maintenance to use a contributed module when possible, as long as that module is in a relatively stable beta or release state. If that's not possible, custom modules should ideally be written in a re-usable manner so that they can either become new contributed modules or become part of an internal private module that can be re-used across projects to reduce work efforts in the future.

If neither of those cases are possible, a new custom module should be developed.

# Adhere to Drupal code standards and use tests to confirm

Developers should follow Drupal [code standards](https://mediacurrent.gitbook.io/olas2021/drupal/practices/coding-standards) at all times. Code editors such as PhpStorm and VS Code both have settings or extensions to allow those standards to be run directly in the editor, such as every time a file is saved. In addition, projects should include the Coder project and then that can be configured to run on both git commits and as part of automated testing pipelines in case anything was missed by the developer's code editor.

# Include docblock commments

In addition to inline and multiline comments, you should take advantage of [Drupal's support for docblock](https://www.drupal.org/docs/develop/standards/api-documentation-and-comment-standards#s-notes-and-standards) comments and document your functions, classes, and other constructs using the docblock syntax. For example, the following comment could apply to a batch API callback:

```php
/**
 * Perform tasks when a batch is complete.
 *
 * Callback for batch_set().
 *
 * @param bool $success
 *   A boolean indicating whether the batch operation successfully concluded.
 * @param int $results
 *   The results from the batch process.
 * @param array $operations
 *   The batch operations that remained unprocessed. Only relevant if $success
 *   is FALSE.
 *
 * @ingroup callbacks
 */
function callback_batch_finished($success, $results, $operations) {
  // Sample code here.
}
```

# Utilize configuration management

If your module includes custom configuration settings, you should include default configuration for those settings in your `config/install` directory of the module.

# Utilize caching

Drupal 8 has a very robust caching system that can be used in a number of ways. For example:

- For things such as heavy database queries or access tokens on API connections, you can cache those results for faster access on subsequent runs.
- Blocks, forms, and custom render arrays all benefit greatly from implementing cache tags and contexts that allow you to more easily target them for accurate cache invalidation.
- If using a CDN caching layer such as CloudFlare, it's often beneficial to disable Drupal's page cache and rely on Drupal's dynamic page cache instead, in combination with the CDN caching layer taking the place of the static page cache.

# Never hack Drupal core or contributed modules

As a rule, you should never hack custom changes into Drupal core or contributed modules. In scenarios where you need to implement a customization for either core or a contributed module, you should instead create a patch and apply it via compoaser.

# Use render arrays and Twig templates

In Drupal 8, custom templates can be defined with hook_theme(), which will then allow you to make custom render arrays to pass data to your custom Twig templates. This can be especially useful for scenarios such as custom blocks or custom queries that aren't built with Views. In most cases, your rendered controllers or blocks should return a render array rather than raw HTML created by calling Drupal's internal renderer; doing this will allow caching to bubble up to higher contexts appropriately and allow for modifications of those render arrays as needed.

# Use object-oriented programming

A fundamental change in Drupal 8 from earlier versions is its shift to using object-oriented programming principles. The [Services and dependency injection in Drupal 8+](https://www.drupal.org/docs/drupal-apis/services-and-dependency-injection/services-and-dependency-injection-in-drupal-8) page on Drupal.org goes into great detail on how to utilize the two concepts.

As a quick summary, services are best suited for procedural code while dependency injection is suitable for usage in controllers or other object-oriented code.

## Use services in procedural code

When working with procedural code (such as hooks in the .module file), you can access object-oriented services using the `\Drupal::service('service.id')` method. [A full list of services for Drupal 9 can be found here](https://api.drupal.org/api/drupal/services/9.2.x).

For example, to connect to the database and execute select queries, you can use code similar to the following:

```php
$connnection = \Drupal::service('database');
$query = $connection->select('redirect', 'redirect')
  ->addField('redirect', 'redirect_source__path', 'source')
  ->addField('reidrect', 'redirect_redirect__uri', 'destination');
$results = $query->fields('redirect', ['status_code'])
  ->condition('redirect.redirect_source__path', 'http://%', 'NOT LIKE')
  ->execute();
foreach ($results as $row) {
  echo "Source: {$row->source}, Destination: {$row->destination}";
}
```

## Use dependency injection in controllers and object-oriented code

When working directly inside a class' code, you can instead use Dependency Injection. For a detailed example of how to use dependency injection, visit the [Dependency Injection for a Form](https://www.drupal.org/docs/drupal-apis/services-and-dependency-injection/dependency-injection-for-a-form) page.

# Using hooks to alter behavior

Drupal provides a large variety of hooks (see [this page](https://api.drupal.org/api/drupal/core%21core.api.php/group/hooks/9.1.x) for the full list) that can be used to alter and extend its behavior in a variety of contexts.

For example, variables passed to a twig template for a node can be modified with `hook_preprocess_node()` or a form could be modified to add additional validation with `hook_form_alter()`.

# Defining custom pages and blocks

# Defining settings forms or other forms

# Defining custom field types, widgets, and formatters

# Using event subscribers

# Writing tests

# Creating and attaching libraries (CSS and JS)