# Decoupled React Demo App

We built a small react app to demo how to integrate it with Drupal for a progressive decouple example.

The app consists of a Google spreadsheet as its data source, a sandbox web server to host the react app, and finally, a drupal instance running on Pantheon.

The premese of the app was to build a component-based app that can be individually mount on Drupal using Drupal blocks with specific IDS.  The react app feeds of the Google Spreasheet, and when mounted in Drupal the app;s data can be updated in Drupal.

Below are the resources where you can grab the codebase for this app.



{% hint style="info" %}
**Progressive Decouple Block Module:**  In addition to the code presented by our team during this training, a former team member also wrote a contrib drupal module called [Progressive Decouple Block](https://www.drupal.org/project/pdb).  This module was written with Angular in mind and takes advantage of Drupal's block to mount Angular apps.
{% endhint %}

Along with the module above, you will find a full Drupal project running this approach which you can take a look and experiment with: [https://github.com/mark-casias/decoupled-blocks-drupal-vm](https://github.com/mark-casias/decoupled-blocks-drupal-vm)

