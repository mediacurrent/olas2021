# Environments

It's recommended that your Drupal project utilizes multiple environments. Drupal hosting providers such as Pantheon and Acquia support this workflow out of the box, but custom hosting environments should support this configuration as well. At minimum, you'll want three environments similar to the following:

* **Dev** - The least stable environment where active development occurs. This is can be synced to every commit of a specific branch in git, such as a `develop` or `dev` branch. New code pull requests or merge requests should target this branch, and Quality Assurance \(QA\) testing should happen on this environment. The database will frequently be replaced with a newer copy from different environments.
* **Stage** - A moderately stable environment used for testing prior to releases. This is often synced to every commit of the stable branch that only changes when releases are made, such as the `main` git branch. The git branch associated with this environment should be free of active or unstable development so that it can be used for quickly testing and applying changes such as security releases or hotfix patches. The database will be less frequently replaced with a newer copy from the production environment.
* **Production** - The stable production environment. This should use a specific git tag on the `main` git branch, such as `1.2.3`. The database should never be replaced except in cases of catastrophic failure, as it's the source of truth for content. By using tagged releases, it should be easy to roll this environment back to a prior release or apply a hotfix as needed by simplying changing the tag that's being targeted.

In addition, it can be beneficial to support ad-hoc environments for developers to be able to share and QA their work prior to it making it to the Dev environment. For example, multidev environments in Pantheon can be created as needed for feature branches.

