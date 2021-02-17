# Drupal Libraries

In a Drupal 8 theme, stylesheets \(CSS\) and JavaScript \(JS\) are loaded through the same system for modules and themes, for everything: [asset libraries](https://www.drupal.org/node/2274843).

Drupal uses a high-level principle: assets \(CSS or JS\) are only loaded if you tell Drupal it should load them. Drupal does not load all assets on every page because it slows down front-end performance.

In the context of component-based theming, we are going to create a library for each individual component we build in Pattern Lab. Each library will have all the CSS and JavaScript \(if any\), the component needs to render as expected.

{% hint style="info" %}
**NOTE: Drupal libraries are only intended to work in Drupal**. They have no effect in Pattern Lab. In Pattern Lab we use Gulp tasks to generate the CSS and JavaScript for components.
{% endhint %}

### Structure of a library

In your editor, open `olas_theme.libraries.yml` \(located in your theme's root\). You will notice the global library already declared which includes all of the global theme styles that apply to all pages on the site \(i.e. typography, brand colors, global styles, etc.\). The global library looks something like this:

{% tabs %}
{% tab title="olas\_theme.libraries.yml" %}
```yaml
global:
  css:
    base:
      dist/css/global.css: {}
```
{% endtab %}
{% endtabs %}

1. **global:** This is the library name.  When we build component's individual libraries, the library name will always be the name of the component it is for.
2. **css**: This is the asset we want to include in the library. Usually `css` and/or `js`.
3. **base**: The ordering category, in this case `base`, is loaded before other categories. Drupal 8 loads stylesheets based on the [SMACSS](https://smacss.com/) ordering: `base`, `layout`, `component`, `state`, and `theme`. All of the components we create will use the `component` ordering.  Drupal also groups/aggregates together assets that belong to the same category for performance reasons.
4. **dist/css/global.css: { }**: This is the path to the asset relative to the root of the theme. All assets in our theme are compiled into `dist/css` or `dist/js`.   A library can have both of these assets.  The path can also include multiple lines of assets.  Say you are building a library for a component that uses a third party stylesheet, in addition to the path above you could include a new line with the path for the third party stylesheet.  Same goes for JS assets.

{% hint style="info" %}
Drupal Asset Libraries are powerful and there is so much more about them. Learn more about [Drupal Libraries](https://www.drupal.org/docs/8/creating-custom-modules/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-module).
{% endhint %}

### Exercise: Create a new library (Repeat for each component)

Let's create a new Drupal library for the Card component so we can apply all css we've written for it when rendered in Drupal.

* In the root of your Drupal theme, open `olas_theme.libraries.yml` in your editor \(replace `olas_theme` if you used a different name for your theme\).
* Somewhere at the bottom of the file, add the code below:

{% tabs %}
{% tab title="olas\_theme.libraries.yml" %}
```text
card:
  css:
    component:
      dist/css/card.css: {}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**TIP**:  Mind the indentation in YML files.
{% endhint %}

Libraries are great because Drupal only loads what we need when we need it to avoid having to load assets that our page or component may never use. This helps with the site's performance.

### Attaching a library

Now that the card component's library is ready, we need to make Drupal aware of it so it can use it. We do this by using Twig's `attach_library` function.

1. In your editor, open `src/patterns/components/card/card.twig`
2. Edit the file by adding the following code at the first line in the file:

{% tabs %}
{% tab title="card.twig" %}
```php
{{ attach_library('olas_theme/card') }}
```
{% endtab %}
{% endtabs %}

_Replace `olas_theme` if your theme name is different._

The `attach_library` function takes a path parameter which we are declaring by using the theme's namespace \(the namespace is registered by the [Components Libraries](https://www.drupal.org/project/components) module\), then the name of the library we want to attach \(i.e. `olas_theme/card`\).

With the code above, we are telling Drupal that whenever we render the card component, its library should be attached so the styles for the component can be applied.

#### Rebuild the theme

Since we modified the card component by attaching the new library, we need to rebuild the component by running the following command, but first stop any other commands by pressing **Ctrl + C** on your keyboard.

```text
npm run build
```

#### **Clear Drupal's cache**

1. Before Drupal can have access to the new library and its assets, clear Drupal's caches.

From now on for every new component we create in Pattern Lab, we are going to create a new library for it. In addition, we are going to attach the new library to the component. As I mentioned before, libraries have no effect in Pattern Lab, but it is a good practice to create and attach a component's library while you are working on the component as it can be easy to forget to do it later.

{% hint style="info" %}
**More on Drupal Libraries**: [https://www.youtube.com/watch?v=V8hnfxSx4Ck](https://www.youtube.com/watch?v=V8hnfxSx4Ck)
{% endhint %}
