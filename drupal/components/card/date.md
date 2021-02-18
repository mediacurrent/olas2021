# Date format

We are using a specific date form which we can achieve by creating a custom date format in Drupal. Or, we could edit one of the existing date formats that come with Drupal core.

1. In Drupal, click on **Configuration &gt; Regional and language &gt; Date and time formats**
2. Click **Edit** next to **Default long date**
3. In the **Format string** field, update its value with `l, F j, Y`
4. Click **Save format**
5. Save your changes.

{% hint style="info" %}
Drupal uses PHP date formats. [Learn more ](https://www.php.net/manual/en/function.date.php)about these formats.
{% endhint %}

## Update the date format in the teaser template

Now that we've updated Drupal's date formats, let's make use of it.

1. Add the following code in `node--blog--teaser.html.twig` \(above all previous code\)

{% tabs %}
{% tab title="node--blog--teaser.html.twig" %}
```php
{% set date = node.createdtime|format_date('long') %}
```
{% endtab %}
{% endtabs %}

* We are setting a variable for date to change its format to the **long** format we just setup.

## Full integration code

Now the full integration template should look like below. Clear Drupal's cache again and reload the homepage. The date format on the articles using the card should now match our designs.

{% tabs %}
{% tab title="node--blog--teaser.html.twig" %}
```php
{# Sets date variable to change to short format. #}
{% set date = node.createdtime|format_date('long') %}

{# Sets variable to trigger content render array. #}
{% set rendered_content = content|render %}

{#
Sets variable for article title to provide all
properties needed by the heading component (heading_level,
modifier, title, and url).
#}
{% set article_title = {
    "heading_level": 3,
    "modifier": "card__title",
    "title": label,
    "url": url
  }
%}

{#
Uses embed to be able to include card component
and make use of twig blocks found in such component.
#}
{% embed '@olas_theme/card/card.twig' with
  {
    "attributes": attributes,
    "title_prefix": title_prefix,
    "title_suffix": title_suffix,
    "heading": article_title,
    "image": content.field_blog_image|render|trim is not empty ? content.field_blog_image,
    "date": date,
    "body_text": content.body|render|trim is not empty ? content.body,
    "tags": content.field_blog_tags|render|trim is not empty ? content.field_blog_tags,
    "modifier": ""
  } only
%}

  {# Outputs tags. #}
  {% block tags %}
    {{ tags }}
  {% endblock tags %}
{% endembed %}
```
{% endtab %}
{% endtabs %}

If you save your changes and reload Drupal's homepage \(you may need to clear caches\), you will see the date now shows in the right format. Now let's fix the tags issues.

