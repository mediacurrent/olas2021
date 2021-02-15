## JSON:API
* Bridging data between Drupal and React can become complicated if security is a concern.
* If you need data in two places, for example the data would need to exist in both Twig and React, you will need to build multiple APIs
* Authentication can disconnect between sources. As an example, a Front-end auth token could expire before the connected Drupal login session expires.