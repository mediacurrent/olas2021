# Card component

A Card component or pattern is a great way to display all sorts of content \(news, blog posts, events, etc.\), and you will see it in many websites nowadays. The card is not typically displayed on its own, although sometimes it is, but its most common use is as a collection of content. For example, we could use a collection of cards to display latest blog posts or upcoming events. In this exercise we will go over how to build an individual card component first, then a collection of cards. One of the biggest advantages of a component-based development process is the fact that you can reuse components without repeating yourself or duplicate code. Let's start.

![Card component example](../../../.gitbook/assets/card.png)

Although we could build the content list components already as a collection of content, a better approach is to first build a single instance of a card component that then we can reuse over and over. Having a single card component available makes it possible to even build other types of content collections.

## Exercise:  Card component

One of the first things we need to define are the data fields that makeup the component. If you look at the image above, a single Card has the following data fields:

* image
* title \(link to full article\)
* date
* body
* & tags

Now that we have identified the card's fields, let's start building it.

### Component's stock content

1. Inside `src/patterns/components` create a new folder called **card**
2. Inside the _card_ folder create a new file called **card.json**
3. Inside _card.json_ add the following code:

{% tabs %}
{% tab title="card.json" %}
```yaml
{
  "image": "<img src='https://source.unsplash.com/6VhPY27jdps/640x360' alt='Cups of coffee' />",
  "heading": {
    "heading_level": "2",
    "modifier": "card__title",
    "title": "Staying sane in times of chaos",
    "url": "#"
  },
  "date": "March 16 2020",
  "body_text": "Curabitur blandit tempus porttitor. Vestibulum id ligula porta felis euismod semper. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
  "tags": [
    {
      "name": "Health",
      "url": "#"
    },
    {
      "name": "Friend",
      "url": "#"
    },
    {
      "name": "Life",
      "url": "#"
    }
  ],
  "modifier": ""
}
```
{% endtab %}
{% endtabs %}

Most field types above are pretty common \(string, date, image, array\). The tags as an array of items. Each tag item inside the array has a `text` and `url` keys so they can become links to tag-driven pages on our site.

### Component's markup

1. Inside the _card_ folder create a new file called **card.twig**
2. Inside _card.twig_ add the following code:

{% tabs %}
{% tab title="card.twig" %}
```php
{{ attach_library('olas_theme/card') }}

<article class="card{{ modifier ? ' ' ~ modifier }}{{- attributes ? ' ' ~ attributes.class -}}"
  {{- attributes ? attributes|without(class) -}}>

  {% if image %}
    <div class="card__media">
      {{ image }}
    </div>
  {% endif %}
  <div class="card__content">
    {% if heading %}
      {{ title_prefix }}
      {%
        include '@olas_theme/heading/heading.twig' with {
          heading: heading
        } only
      %}
      {{ title_suffix }}
    {% endif %}

    {% if date %}
      <div class="eyebrow card__date">
        {{ date }}
      </div>
    {% endif %}

    {% if body_text %}
      <div class="card__body">
        {{ body_text }}
      </div>
    {% endif %}

    {% if tags %}
      <ul class="tags">
        {% for item in tags %}
          <li class="tag__item">
            <a href="{{ item.url }}" class="tag__link">
              {{ item.name }}
            </a>
          </li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>
</article>
```
{% endtab %}
{% endtabs %}

* Just as we did with the Hero, we are including the `attributes` placeholder so when we integrate the card with Drupal the attributes Drupal provides can be available in our card.
* Once again we are making use of the Heading component by using a Twig include statement.
* With the tags we loop through the `tags` array and then add each  tag item as a list item in an unordered list.

{% hint style="warning" %}
Don't forget to create and attach the Card's library.
{% endhint %}

### Color updates

{% hint style="info" %}
**Update Colors:** Copy the color variables below and override the content of `src/global/colors/_colors.scss`
{% endhint %}

{% tabs %}
{% tab title="src/global/colors/\_colors.scss" %}
```css
// Standard.
$color-white: #fff;
$color-black: #1b2b34;

// Primary.
$color-mandy: #ec5f67;
$color-tan-hide: #f99157;
$color-saffron-mango: #fac863;
$color-de-york: #99c794;
$color-tradewind: #5fb3b3;
$color-danube: rgb(52, 109, 167);
$color-navy-blue: rgb(8, 48, 88);

// Grays.
$color-gray-dk: #343d46;
$color-gray-med: #4f5b66;
$color-gray-light: #65737e;
$color-gray-xlt: #a7adba;
```
{% endtab %}
{% endtabs %}

### Component styles

1. Inside the _card_ folder create a new file called **card.scss**
2. Inside _card.scss_ add the following code:

{% tabs %}
{% tab title="card.scss" %}
```css
// Import site utilities
@import '../../global/utils/init';

.card {
  background-color: $color-white;
  box-shadow: 0 10px 15px -3px rgba($color-black, 0.1), 0 4px 6px -2px rgba($color-black, 0.05);
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  max-width: 320px;
  position: relative;

  @include breakpoint($bp-md) {
    flex: 0 0 45%;
  }

  img {
    display: block;
    width: 100%;
  }

  .card__content {
    padding: 10px 20px 20px;
  }

  // ========== Card wide styles=========
  &.card--wide {
    border: 1px solid darken($color-gray-light, 10%);
    box-shadow: none;
    flex-direction: column;

    // Changes card layout on larger screens.
    @include breakpoint($bp-sm) {
      flex-direction: row;
      max-width: 720px;

      .card__content {
        flex: 0 0 70%;
      }

      img {
        max-width: 100%;
      }
    }

    .card__media {

      @include breakpoint($bp-sm) {
        flex: 0 0 30%;
      }
    }
  }

  .eyebrow {
    border-bottom: 1px solid $color-gray-med;
    font-size: 1.3rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding-bottom: 8px;
  }
}

.card__body {
  margin-bottom: 20px;
}

.card__title {
  font-size: 2.4rem;
  font-weight: 600;
  margin: 0;
}
```
{% endtab %}
{% endtabs %}

* We'll get into the styles above in more detail later on.

### Compiling the code

Now that the card component is done, let's compile the code so we can see it in Pattern Lab. If the watch task is running you should be able to see the card component in Pattern Lab, otherwise follow these steps:

While in your theme's root directory, run the following commands in your command line and press **Return**

`npm run build`

`npm run watch`

In your browser of choice open the following URL: [http://localhost:3000](http://localhost:3000). This will open Pattern Lab where you can find the Card component under components.

### Accessing Pattern Lab from within Drupal

When working with Pattern Lab locally it makes sense to use [http://localhost:3000](http://localhost:3000) to view your work. However, if you are viewing your project from a server during development, or want to show your work and progress to a stakeholder or client, this approach will not work. Luckily for us, we can access Pattern Lab using Drupal's URL as follows:

`/themes/custom/olas_theme/patternlab/index.html`

Two things to keep in mind with the path above:

1. The path above is appended to your Drupal's base URL.  For example, if your Drupal's address is [https://dev.pantheon.io](https://dev.pantheon.io), the full URL would become [https://dev.pantheon.io/themes/custom/olas\_theme/patternlab/index.html](https://dev.pantheon.io/themes/custom/olas_theme/patternlab/index.html)
2. Replace `olas_theme` with your project's theme name if your theme name is different.

