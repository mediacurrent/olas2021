# SonarQube

https://stackoverflow.com/a/30618291

## Configuration

SonarQube may require additional setup to get it configured and working for Drupal projects. Some potential adjustments that may need to be made:

* [Use the Drupal Quality Profile](https://docs.sonarqube.org/pages/viewpage.action?pageId=1441864)
* [Add Drupal file extensions (.module, .profile, .install)](https://stackoverflow.com/a/30618291)

## Usage

Excerpted from [SonarQube's documentation](https://docs.sonarqube.org/pages/viewpage.action?pageId=1441864)

1. Install [SonarQube Server](https://docs.sonarqube.org/display/SONAR/Setup+and+Upgrade)
2. Install [SonarQube Scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) and ensure that you can call `sonar-scanner` from the directory where you have your source code.
3. Install [SonarPHP](https://docs.sonarqube.org/display/SONAR/Installing+a+Plugin)
4. [Run your analysis](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) with the SonarQube Scanner by executing the following command from the root directory of the project:

```
sonar-scanner -Dsonar.projectKey=xxx -Dsonar.sources=.
```

After the scan completes, follow the link provided to browse your project's quality in the SonarQube UI.

## Installing With Docker

SonarQube is an excellent candidate to handle via Docker to abstract it away and run it on any environment. See this article for more details on how to set it up with docker: [Best Practices - Inspecting Selenium Tests Code Quality Using SonarQube](https://www.vinsguru.com/best-practices-sonarqube-for-selenium/)