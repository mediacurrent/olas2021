# Tips

* Consider fully decoupled
* Drupal blocks/paragraphs can send data attributes down to the component level as props. This is great for static data.
* Consider using [React Portals](https://reactjs.org/docs/portals.html) if you need to share context between components. Here is the [Angular equivalent](https://material.angular.io/cdk/portal/overview) that is available via Angular Material.
* Paragraphs would be preferred over blocks
* If using AJAX to manage state, go with React or other decoupled framework
* If you use React, don't use `create-react-app`. It comes bundled with opinionated tooling that assumes you're fully decoupled.

{% hint style="info" %}
Further reading: [A Recipe for an Embedded React Component in Drupal](https://www.mediacurrent.com/blog/recipe-embedded-react-component-drupal/)
{% endhint %}

