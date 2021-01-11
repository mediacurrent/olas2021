# Local Environment

## About the Local Environment <a id="About-the-Local-Environment"></a>

This project utilizes the DDEV local environment to ease the process of getting a local environment running consistently between all developers. From the project page:

> [DDEV](https://github.com/drud/ddev) is an open source tool that makes it dead simple to get local PHP development environments up and running within minutes. It's powerful and flexible as a result of its per-project environment configurations, which can be extended, version controlled, and shared. In short, DDEV aims to allow development teams to use Docker in their workflow without the complexities of bespoke configuration.

DDEV makes it relatively easy to get an environment running using [Docker](https://www.docker.com/products/docker-desktop). The default setup for DDEV includes several useful containers, such as a router \(so that URLs can be accessed like [https://dell.ddev.site](https://dell.ddev.site)\), a web container for PHP + drush, and a MySQL container for the database. Because these containers all run within Docker, there are no external dependencies that are required on the host machine other than DDEV and Docker itself, and there is little provisioning time \(unlike Vagrant + Ansible\).

### Why DDEV? <a id="Why-DDEV?"></a>

DDEV isn’t a requirement to run this project. Any LAMP or LEMP stack could work, whether that’s installed directly on the host machine, through a Vagrant VM, or some sort of a custom Docker setup. The benefit of DDEV is that includes several useful commands and it’s easy to get setup. It also includes an optional NFS configuration that improves performance on MacOS, which Docker typically struggles with in that OS.

### Why Docker? <a id="Why-Docker?"></a>

Docker is useful for several reasons. One is momentum; it is being used widely throughout the industry due to both it’s ease of use for constructing local environments and its flexibility for usage in production-ready platforms. In our case, we’re only using it for the local environment, and we’re abstracting it through DDEV.

We recommend continuing to use Docker and DDEV, but virtual machines created with Vagrant are also a good option. One of the main benefits of Docker over that setup is the ubiquity of useful Docker images for web development, and a much shorter provisioning time \(versus something like Ansible when used in Vagrant\).

### Release and deployment <a id="Release-and-deployment"></a>

Docker and DDEV are not heavily involved in the deployment process, but they can be used to simplify it somewhat. 

### MacOS and Windows Setup

In addition to the **Prerequisites** section below which has direct links to most things you may need to install, we also have instructions specific for both MacOS and Windows. The Windows instructions are written with Windows Subsystem for Linux in mind, so they can also be used with Linux \(substituting in commands more appropriate to your specific Linux distro as needed\).

* [DDEV + MacOS](https://codeandtheory.atlassian.net/wiki/spaces/MA/pages/1601372675)
* [DDEV + WSL2 \(Windows\)](https://codeandtheory.atlassian.net/wiki/spaces/MA/pages/1468106052)

### Prerequisites

{% hint style="warning" %}
Each prerequisite below includes links to install it for its respective operating system. Because Terminus is integral to working with this project and is only supported on Mac and Linux, it’s recommended that you use the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and follow the Linux installation instructions for all prerequisites except for Docker and DDEV.
{% endhint %}

* [Docker](https://www.docker.com/) - Allows developers to create environments with multiple containers which more closely matches production hosted environments.
  * [Mac](https://docs.docker.com/docker-for-mac/install/) \| [Windows](https://docs.docker.com/docker-for-windows/install/) \| [Linux](https://docs.docker.com/engine/install/)
* [DDEV](https://ddev.readthedocs.io/en/stable/) - Local php environment tool built upon Docker.
  * [Mac](https://ddev.readthedocs.io/en/stable/#homebrewlinuxbrew-macoslinux) \| [Windows](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows) \| [Linux](https://ddev.readthedocs.io/en/stable/#homebrewlinuxbrew-macoslinux)
* [Git](https://git-scm.com/) - Version control system \(VCS\).
  * [Mac](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#_installing_on_macos) \| [Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#_installing_on_linux)
* [Bitbucket](https://bitbucket.org/) - A hosted version control system.
* [Composer](https://getcomposer.org/) - Package manager similar to npm \(JS\) and pip \(Python\).
  * [Mac](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos) \| [Linux](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)
  * NOTE: Composer is also included in DDEV, so you can run ddev composer &lt;command&gt; in place of composer &lt;command&gt; in later sections of this tutorial if preferred. The only significant drawback to running composer through DDEV is that install and update times are generally longer when running through it.
* [Drush](https://www.drush.org/) - Command line tool made for Drupal.
  * [Mac](https://docs.drush.org/en/8.x/install/) \| [Linux](https://docs.drush.org/en/8.x/install/)
  * NOTE: It’s recommended that you [install the drush launcher](https://docs.drush.org/en/master/install/) if possible which will allow you to use the version of drush included with the project if you’re in the project directory. We use drush 8 for this project.
* [Terminus](https://pantheon.io/docs/terminus) - Command line tool made for working with Pantheon hosting services.
  * [Mac \| Linux](https://pantheon.io/docs/terminus/install)

### Clone the repository

### Initialize the project

#### 1. Install composer dependencies

The site’s Drupal 8 core and contributed modules are all managed via composer. Use your terminal to get to the site’s directory and run a composer install command.

```text
cd ~/Sites/delld8
composer install
```

#### 2. Start DDEV

```text
ddev start
```

Once that has completed, the sites will be available at [https://dell.ddev.site](https://dell.ddev.site).

The local environment used for the site is [DDEV-Local](https://ddev.readthedocs.io/en/stable/). This is a Docker-based environment that simplifies the process of getting a running Drupal 8 install using php + MySQL + apache/nginx. We’re currently using nginx to help mimic the Pantheon environment.

The site will not work at this point because it doesn’t have the database. Proceed to the next step to import the database.

{% hint style="info" %}
**Working with drush in DDEV**: To execute drush commands in DDEV, prefix them with **ddev .** such as `ddev . drush cr` \(notice the period after ddev\).
{% endhint %}



