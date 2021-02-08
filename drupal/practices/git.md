# Git

Drupal projects should be maintained using version control, such as Git.

# Git Branches

There should be matching git branches in relation to the environments defined on the hosting platform. For example:

- `develop` - Active development branch (pull request merge target)
- `master` - Stable branch of the site, should be clean and ready for hotfixes as needed
- `1.2.3` - Production releases should use git tags rather than a branch. Tags should be created directly from the latest commit on master after a new release merge.

In addition, there are a number of branching strategies that can be used by developers. [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) and [GitHub Flow](https://guides.github.com/introduction/flow/) are two such branching strategies.

For example, if using Git Flow, a developer would checkout the `develop` branch, pull the most recent changes, and then checkout a new branch off of that such as `feature/DELL-123--foobar`. They would then make their changes, commit them, and create a pull request against the `develop` branch.

Towards the end of the development sprint, the lead developer could then checkout a branch such as `release/1.2.3`, corresponding to the expected git tag that will be created for the new version. This branch would then have a new pull request created with `master` as the merge target. After it's merged, a new `1.2.3` git tag would be created, and the production environment would be updated to use the new tag.

# Drupal 8 .gitignore

When working with a Drupal 8 or 9 project, you shouldn't commit the entire code base to the repository, which is a significant change from how Drupal 7 typically functioned.