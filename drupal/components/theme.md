# Build a Drupal 8 Theme

As part of this training, you will need to have a working Drupal 8 theme which includes Pattern Lab. Using [Mediacurrent's theme generator](https://github.com/mediacurrent/theme_generator_8), follow the instructions below to build a new custom Drupal 8 theme.

{% hint style="warning" %}
**WARNING:** As of 2/16/2021, [Pattern Lab's version `5.14.0`](https://github.com/pattern-lab/patternlab-node/releases/tag/v5.14.0) introduced a couple of bugs that will need to be addressed before you can have a working theme. Follow steps below when prompted.
{% endhint %}

## Mediacurrent Theme Generator

The [Mediacurrent theme generator](https://github.com/mediacurrent/theme_generator_8) is a scaffolding tool that has evolved with the years to provide a production-ready Drupal 8 theme that is component-based ready out of the box.

## Exercise:  Create a new D8 theme

{% hint style="info" %}
**A PRESENT FOR YOU 🎁** [A working theme has been added](https://github.com/mediacurrent/olas2021/tree/main/drupal/theme) to this training repository for your convenience. All issues identified above have been addressed. Copy and paste it into your Drupal 8 site.
{% endhint %}

[Watch the video tutorial,](https://www.youtube.com/watch?v=cVyA2v-UwSQ&feature=youtu.be) or follow the instructions below.

1. In your Drupal 8 site, create a new folder for your theme \(i.e. `/themes/custom/olas_theme`\).  Although you can use any name you wish, all exercises in this curriculum use **olas\_theme**.
2. In your command line app, change into the newly created directory \(**olas\_theme**\),  type the following command and press **Return**:

```bash
nvm install node && node -v > .nvmrc
```

_The command above will install the latest stable version of NodeJS and create a new hidden file in your project called `.nvmrc` where that version of Node will be declared as the default version for this project._

{% hint style="warning" %}
_**About NodeJs**:  One problem with using the latest version of_ any _tool is that they sometimes introduce bugs.  This seems to be the case with the latest NodeJS version as of 2/18/2021.  If your **watch** task keeps crashing when you make JSON or Twig changes, try the following:_

1. _Change the version of node in **.nvmrc** to \`_v12.10.0\`
2. Delete **node\_modules** from the root of your theme
3. Run **nvm install**
4. Run **nvm use**
5. Run **npm install**
{% endhint %}

* Run the following command:

```bash
npm create yo mc-d8-theme
```

### Respond to the on-screen prompts as follows:

1. Assign a Human readable name to your theme
2. **IMPORTANT:** When the **What is your theme's machine name?** question comes up, be sure it matches the name of the directory you created above \(i.e. `olas_theme`\).
3. Type a description for your theme
4. Select **Use stable** **as your base theme**
5. Type **Y** and press **Return** when **Should we update the .gitignore to ignore compiled files?** comes up.  This will hide `/dist` from git to avoid having to commit already compiled files.
6. While you can select any demo components from the list, we recommend the following ones:
   1. Button
   2. Eyebrow
   3. Drupal Messages
   4. Drupal Tabs

{% hint style="warning" %}
**WARNING:** The theme's machine name should always match the directory you created in the first step above \(i.e. `olas_theme`\).
{% endhint %}

* After the theme has been successfully created, type the following commands from the theme's root:

{% hint style="warning" %}
**WAIT, WAIT!!!:** Time to fix Pattern Lab bugs. If new releases of Pattern Lab have been made and bugs have been addressed, you can skip step 2, but still confirm step 1 is done:

1. Open `patternlab-config.json` and replace the `name` entry under `uikits` to be `"package": "@pattern-lab/uikit-workshop",`
2. Follow the steps to [fix the bugs as shown here](https://github.com/pattern-lab/patternlab-node/releases/tag/v5.14.0).
{% endhint %}

```bash
npm run build

npm run watch
```

* Click the URL provided at the end of the last command's output \([http://localhost:3000\](http://localhost:3000%29\), to access Pattern Lab.

If you wish to access Pattern Lab using Drupal's URL, use the following path:

* [https://drupaltraining.ddev.site/themes/custom/olas\_theme/patternlab/index.html](https://drupaltraining.ddev.site)

_If you don't have HTTPS enabled, use HTTP in the url above._

## Resources

Project: [https://github.com/mediacurrent/theme\_generator\_8](https://github.com/mediacurrent/theme_generator_8)

