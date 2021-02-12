# Drupal Views

To build the _From our blog_ section we are going to use the power of Drupal's views and View Modes. By querying all Blog content we can generate a list of blog posts, then using View Modes, we can determine the fields we'll expose as well as the format in which fields will be rendered. Drupal Views are database queries you can write and execute using Drupal's UI.

### Exercise: Blog posts View

1. From Drupal's Admin toolbar click **Structure \| Views**
2. Click the **Add view** button
3. For View name type **Blog posts**
4. Machine name should auto complete to `blog_posts`
5. For VIEW SETTINGS, **Show** _Content_ **Of type:** _Blog_
6. Check **Create a block** under BLOCK SETTINGS
7. Type **From our blog** as the block title
8. Clear the value from the **Items per block** field
9. Click the **Save and edit** button

#### Updating the view

1. At the top of the view, change the _Display name ****_ ****to **From our blog** by click the word **Block** and typing the new display name under the _Administrative name_ field, then pressing the **Apply** button.  This helps you distinguish each of your views displays as you work with them.
2. In the FORMAT section, click **Settings** next to _Unformatted list_ and clear the **Add views row classes** checkbox and then press the **Apply** button.  Since we will be writing our own markup, we don't need Drupal's default classes.
3. Still in the FORMAT section, click **Fields**, then select **Content** and ensure **Teaser** is displayed in the **View mode** dropdown.  Then click the **Apply** button.  As we discussed before, we will use the _Teaser_ view mode to display the 4 articles shown in the _From our blog ****_section.
4. Under FILTER CRITERIA, click the **Add** button, then search for **Promoted to front page**
5. Check the checkbox next to **Promoted to front page** &gt; _**Content**_, then click the **Add and configure filter criteria** button
6. At the filter criteria window, ensure **is equal to** is the operator, and **No** is the ****_Promoted to front page status_
7. Click _the **Apply** button_
8. Under BLOCK SETTINGS, change the block name to **From our blog** by clicking _block,_ then clicking the **Apply** button.  This will appear as the name of this block in administer &gt;&gt; structure &gt;&gt; blocks.
9. Expand the ADVANCED fieldset to the right of the view page
10. Under _Machine name**,**_ click the current value and change it to **from\_our\_blog**, the click the **Apply** button.  Using a custom and meaningful name ensures our twig template suggestions will use names that make sense. _****_You will see this later.
11. In the PAGER section, click the **display all items** link and change its setting to **Display a specified number of items**, when prompted type **4** for the number of items to display.
12. _Finally, save all your changes by pressing the **Save** button._  Failing to press __**Save**, will result in loosing all your changes.

Your view should look like the image below.  _Click on it to zoom in._

![](../.gitbook/assets/view.png)
