# View modes

[Amazon demo of view modes](https://www.amazon.com/Kate-Laurel-Marrakesh-Abstract-Holloway/dp/B086R2JGZ2/ref=pd_di_sccai_7?pd_rd_w=0LEJ7&pf_rd_p=c9443270-b914-4430-a90b-72e3e7e784e0&pf_rd_r=53ZTGDFRGYMPSK4300RB&pd_rd_r=c2c6f81d-2df6-43ad-91c4-4db55830c801&pd_rd_wg=jYhNQ&pd_rd_i=B086R2JGZ2&psc=1).

## Why view modes?

There are many ways to manage how the same type of content can be displayed differently depending on the requirements, but one very effective way is to use Drupal's [View Modes](https://www.drupal.org/node/2511722#s-view-modes-and-view-displays). View modes allows us to control the fields we want to display on different areas of our website. This can be handy as we saw in Amazon, the same item can be displayed differently depending on what our goal is.

### Here's our plan with these view modes:

| View mode | Purpose |
| :--- | :--- |
| **Default** | This will remain untouched so it can serve as template for new view modes we may create in the future |
| **Full content** | This will be used when displaying the full node of a blog post \(detailed page\) |
| **Teaser** | This view mode will be used by the regular Card component to build the **From our blog** section in the homepage |

## Manage fields with view modes

Managing fields with view modes ensures we are letting Drupal do things the way Drupal like to do things for rendering content. Then through the use of twig template suggestions per each view mode we integrate the components we want to use to render our content.

## Configure the Teaser view mode

1. While still in the Blog content type, click **Manage display**
2. Click the **Teaser** view mode
3. Drag the **Links** fields into the **Disabled** section.
4. Change each of the field's labels to **Hidden**
5. For the **Body** field, change the Format to **Trimmed** and change the **Trim limit** to 125 characters by clicking the cogwheel icon to the right of the body field
6. Click the **Update** button
7. We'll comeback to configuring the image field with the right image styles later on
8. Click the **Save** button

## **Full content view mode**

1. Hide the labels of all the fields
2. Save your changes

