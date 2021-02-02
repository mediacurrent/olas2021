# Integrating Components

Intesgrating componens we have built on a design system like Pattern Lab or other can be complex process depending on the data architecture in Drupal and what we expect to render.  However, there are some basic principles that when followed can make this process an easier one.

The idea of component integration with Drupal is that we achieve a single source of thruth for markup, styles and behavior of comonents.  This single source is the design system \(i.e. Pattern Lab\).  As we learned earlier, using Drupal's presenter templates, or twig template suggestions, we ensure that those templates only job is to pass the data from Drupal to the components.  Since everything else is being handled at the component level \(HTML, CSS, and JavaScript\), our template suggestions end up lean and clean.

Let's integrate the Card component we previously built in Pattern Lab so our Drupal content can make use them.

