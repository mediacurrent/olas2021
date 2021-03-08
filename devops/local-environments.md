# Local Environments

## Vagrant

[Vagrant](https://www.vagrantup.com/) is a CLI for provisioning VMs quickly and easily using providers such as VirtualBox or VMware.

It's robust and has a great deal of knowledge built up around it over the years. It's simple to run and can work on any machine due to the widespread support of its VM providers. [DrupalVM](https://www.drupalvm.com/) simplifies the process of using Vagrant for Drupal by using ready-made configurations with Ansible.

## Docker

Docker has been steadily growing for both production and local environments for many years now, and the biggest benefit to it is how containerization works. Any application can be containerized, due to containers acting essentially as micro VMs. For example, it's often easier to make a container for additional services such as Solr or Node JS when they become needed than it would be to build an entirely new VM base box or adjust an Ansible provisioning script. Dockerfiles are predictable and easy to configure.

Many Drupal tools have either pivoted towards Docker or were created in reaction to it, such as:

* [DDEV](https://www.ddev.com/ddev-local/)
* [Lando](https://lando.dev/)
* [Docksal](https://docksal.io/)
* [Roll your own \(wodby\)](https://github.com/wodby/docker4drupal)

All of these tools are essentially wrappers for Docker's `docker-compose.yml` service declaration format, but they each come with their own tools and CLIs to make working with Drupal in containers easier, along with building out a battle-tested local development environment following best practices.

DDEV in particular is our choice for our local development environments, primarily for two reasons:

* DDEV allows you to define custom docker-compose files, allowing you to create other non-Drupal services such as Solr or Gatsby. The other project do this as well, but few make the process as easy as it is with DDEV.
* Docker for Mac and Docker for Windows have notoriously bad performance on projects that have a large number of files, such as PHP-based projects like Drupal. This is due to the hyper visor VM used to translate operations between the host machine and Docker, which is a Linux-native application. However, a common work around for this is to use NFS mounts to bypass the costly file IO translation operations, and DDEV includes documentation and scripts to make this configuration very simple to set up. This is less of an issue on Windows, where the new WSL2 feature \(Windows Subsystem for Linux\) can allow Docker to run natively within the Linux kernel that WSL2 uses.

