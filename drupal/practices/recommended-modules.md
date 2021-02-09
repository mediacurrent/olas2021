# Essentials

These modules are essential for Drupal site building in most cases.

- [Admin Toolbar](https://www.drupal.org/project/admin_toolbar) (Beginner) - The admin toolbar is a simple module that adds rollover menus to the Drupal admin experience.
- [Component Libraries](https://www.drupal.org/project/components) (Intermediate) - This module is a must-have if you are doing custom theming development. We leverage this module in our projects to map Drupal templates to their corresponding Pattern Lab component.
- [Field Group](https://www.drupal.org/project/field_group) (Beginner) - This module lets you organize fields into tabs, accordions, etc. to give your content editors a better experience.
- [Googalytics - Google Analytics](https://www.drupal.org/project/ga) (Beginner) - This module replaces the former Google Analytics module. Its purpose is to give administrators the ability to easily add basic visitor tracking.
- [Linkit](https://www.drupal.org/project/linkit) (Beginner) - The LinkIt module gives you an autocomplete popup inside of Wysiwyg for adding links.
- [Metatag](https://www.drupal.org/project/metatag) (Beginner) - Maintained by Mediacurrent’s very own Damien McKenna, this module lets you configure all of your meta tags for SEO purposes. We have the meta tags field enabled on our content type features by default, which skips a step when you need to customize them on individual pages.
- [Node Revision Delete](https://www.drupal.org/project/node_revision_delete) (Beginner) - By default Drupal core does not do anything to pare back old revisions. This can be a problem on larger sites as well as sites that use Paragraphs which act as a multiplier for revisions. This module provides a simple solution in that it allows admins to discard older revisions automatically.
- [Paragraphs](https://www.drupal.org/project/paragraphs) / [Entity Reference Revisions](https://www.drupal.org/project/entity_reference_revisions') (Beginner) - Our team uses Paragraphs extensively which we tie to Pattern Lab components in the our standard theme builds. Paragraphs enable editors to create robust pages that rely on structured content. The advantage of this approach is that content can be more easily deployed across multiple channels such as a decoupled Frontend. Even if you're using Layout Builder, Paragraphs can often supplement it by adding more complex paragraphs fields on the block types defined for your layouts.
- [Paragraphs Browser](https://www.drupal.org/project/paragraphs_browser) (Beginner) - One of the significant features is a better UX with custom thumbnails for each Paragraph type. We believe this gives editors a much better experience when using Paragraphs.
- [Pathauto](https://www.drupal.org/project/pathauto) / [CTools](https://www.drupal.org/project/ctools) / [Token](https://www.drupal.org/project/token) (Beginner) - The Pathauto module lets you set up clean alias patterns for all of your content. If you want all of your blogs to have the path /blog/[title of the blog with hyphens instead of spaces] - this will be the module that you use.
- [Redirect](https://www.drupal.org/project/redirect) (Beginner) - Most new sites need to incorporate 301 redirects for old page URLs. The redirect module gives site admins an easy interface for creating those redirects in Drupal.
- [Search API](https://www.drupal.org/project/search_api) (Intermediate) - The Search API suite of modules is a fantastic way to configure your site searches.
- [Simple Sitemap](https://www.drupal.org/project/simple_sitemap) (Intermediate) - A pretty easy to configure module for creating XML sitemaps for search engines.
- [Webform](https://www.drupal.org/project/webform) (Beginner) - This module makes it easy to create forms on your Drupal website.

# Additional Recommendations

These modules make all the difference to improve your content, media, and theming experience.

- [Address](https://www.drupal.org/project/address) (Beginner) - We use the Address field with the Geolocation module to create a Map Paragraph. This allows authors to easily place a Map anywhere on a page.
- [Allowed Formats](https://www.drupal.org/project/allowed_formats) (Beginner) - This module lets you define allowed formats at the field level. We use this module to configure an “Embed” paragraph strictly for 3rd party embeds.
- [Block Field](https://www.drupal.org/project/block_field) (Beginner) - One of our newer paragraphs features uses this module to render a Block within a paragraph. This allows editors to have a consistent experience for how they construct a page.
- [Geolocation](https://www.drupal.org/project/geolocation) (Beginner) - The Geolocation module makes it simple to add a point on a map and have that map render in a field. As mentioned previously, we leverage this module in our Map paragraph feature.
- [Guardr](https://www.drupal.org/project/guardr) (Intermediate) - The Guardr module bundles a number of sensible defaults and modules together to greatly improve your site's security profile.
- [Moderation Sidebar](https://www.drupal.org/project/moderation_sidebar) (Beginner) - The moderation sidebar adds improved UX for modifying content states by integrating moderation into the admin toolbar area.
- [Multiline Config](https://www.drupal.org/project/multiline_config) (Intermediate) - This is a small utility module we use to allow config to wrap multiple lines, which is a huge help when managing Webforms.
- [Scheduler](https://www.drupal.org/project/scheduler) (Beginner) - The scheduler module lets you schedule the publishing and unpublishing of your content.
- [SVG image](https://www.drupal.org/project/svg_image) (Beginner) - The SVG image module allows SVG files to be used with image formatters. Our team often uses SVGs as the main image within a card component.
- [Taxonomy Access Fix](https://www.drupal.org/project/taxonomy_access_fix) (Beginner) - This project addresses the fact that core Taxonomy doesn’t have granular enough permissions. The Taxonomy Access Fix module provides additional permissions to fill in the gaps.
- [Twig Tweak](https://www.drupal.org/project/twig_tweak) / [Twig Field Value](https://www.drupal.org/project/twig_field_value) (Intermediate) - These theming utility modules add functions to Twig to make it quicker and easier to theme in Drupal.
- [Video Embed Field](https://www.drupal.org/project/video_embed_field) (Beginner) - This module can be used to provide a Video media type that can support popular 3rd party services like YouTube.
- [Viewsreference](https://www.drupal.org/project/viewsreference) (Beginner) - The Viewsreference module gives editors the ability to select a View from a field.
- [Yaml Content](https://www.drupal.org/project/yaml_content) (Advanced) - This module is used by developers to stage sample content. Mediacurrent’s team uses Yaml Content during development to construct a consistent “state” that makes collaborative development faster and easier.
