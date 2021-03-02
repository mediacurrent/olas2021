# Automated Testing

There are several [different kinds of automated tests](https://www.drupal.org/docs/testing/types-of-tests) for various scenarios:

* **Unit Tests** - Unit tests without and with a database connection. For detailed identification of bugs in your code and building a logical application structure.
* **Kernel Tests** - Kernel tests sit between Unit tests which allows them to interact with the Drupal application in a meaningful way, but they allow the test to only utilize the aspects of Drupal required for the test to function.
* **Functional Tests** - This type of testing is often called System or Functional testing because it tests on the complete system. Drupal 8 ships with two types: BrowserTestBase and JavascriptTestBase.
* External frameworks, such as [Behat](https://docs.behat.org/en/latest/) or visual regression tests

{% hint style="info" %}
### Further Reading

[This article on deninet.com](https://deninet.com/blog/2018/12/31/writing-automated-tests-drupal-8-part-1-test-types-and-set) is an excellent resource on automated testing in Drupal and is highly recommended for learning more about the different kinds, what they do, and how to write them.

Additional parts:

- [Pt. 2, Functional Tests](https://deninet.com/blog/2019/01/13/writing-automated-tests-drupal-8-part-2-functional-tests)
- [Pt. 3, Unit Tests](https://deninet.com/blog/2019/01/27/writing-automated-tests-drupal-8-part-3-unit-tests)
- [Pt. 4, Kernel Tests](https://deninet.com/blog/2019/02/10/writing-automated-tests-drupal-8-part-4-kernel-tests)
- (No additional posts have been created in the series yet)
{% endhint %}

## Unit Tests

Unit tests are the fastest kind of tests you can run in Drupal, and the most limiting. These tests can handle parts of your code that can run without Drupal itself, such as functions, methods, and some classes.

## Kernel Tests

Kernel tests are a middle-ground that allow your tests to interact with Drupal in a meaningful way (such as using hooks, services, and or other aspects of Drupal's API), but they do not guarantee that the UI will be present and working. These tests are often a great fit for automated testing pipelines as they can allow you to test for accurate functionality in a relatively quick manner.

## Functional Tests

Functional tests provide a complete clean install of Drupal, and are similar to what Simpletest would have provided in Drupal 7. They do not support Javascript, but they do have a fully functioning install of Drupal and you can assume that code that passes these tests will function correctly in a real context.

## Nightwatch.js tests

Nightwatch.js is a new addition to Drupal 8 testing. It is a popular testing framework written entirely in Javascript and will allow you to test anything in the UI that depends on Javascript.

## Behat

Behat is an automated testing framework that focuses on defining user stories so that testing follows behavior driven development practices.

Behat test scenarios are written in plain english, such as the following:

```
Given there is a "Sith Lord Lightsaber", which costs £5
When there is a "Sith Lord Lightsaber", which costs £10
Then there is an 'Anakin Lightsaber', which costs £10
And there is a Lightsaber, which costs £2
But there is a Lightsaber, which costs £25
```

The matching test for that structure would be as follows:

```php
// features/bootstrap/FeatureContext.php

use Behat\Behat\Tester\Exception\PendingException;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;

class FeatureContext implements SnippetAcceptingContext
{
    private $shelf;
    private $basket;

    public function __construct()
    {
        $this->shelf = new Shelf();
        $this->basket = new Basket($this->shelf);
    }

    /**
     * @Given there is a :product, which costs £:price
     */
    public function thereIsAWhichCostsPs($product, $price)
    {
        $this->shelf->setProductPrice($product, floatval($price));
    }

    /**
     * @When I add the :product to the basket
     */
    public function iAddTheToTheBasket($product)
    {
        $this->basket->addProduct($product);
    }

    /**
     * @Then I should have :count product(s) in the basket
     */
    public function iShouldHaveProductInTheBasket($count)
    {
        PHPUnit_Framework_Assert::assertCount(
            intval($count),
            $this->basket
        );
    }

    /**
     * @Then the overall basket price should be £:price
     */
    public function theOverallBasketPriceShouldBePs($price)
    {
        PHPUnit_Framework_Assert::assertSame(
            floatval($price),
            $this->basket->getTotalPrice()
        );
    }
}
```

# Integration into pipelines

Once your tests have been written, you can tie them into build pipelines for any CI/CD solution. Many CI tools use a step process and are based on Docker images.

## Gitlab CI/CD

For Gitlab, see [this article](https://www.adcisolutions.com/knowledge/continuous-integration-drupal-8-and-gitlab-cicd) for a quick and thorough example of building and testing Drupal using Gitlab's CI.

## Bitbucket Pipelines

We use Bitbucket Pipelines in our testing. For example:

```yaml

image: mediacurrent/mc-bb-pipelines:latest

pipelines:
  default:
    - step:
        caches:
          - composer
          - composer-project-vendor
        script:
          - uname -a
          - php --version
          - source /root/.bashrc
          - composer selfupdate
          - composer validate --no-check-all --no-check-publish
          - composer --verbose install
          - ls -l ./vendor/bin
          - ./vendor/bin/behat --version
          - ./vendor/bin/drush version
          - ./vendor/bin/phpunit --version
          - composer robo --version
          - composer robo list
          - composer robo project:init tests.site.local 127.0.0.1
          # Drupal coding standards test on custom modules
          - echo "Coding Standards"
          - ./tests/code-sniffer.sh ./docroot
          # Unit tests.
          - echo "PHPUnit unit tests"
          - if [ "$(ls -A docroot/modules/custom/)" ]; then
          - composer robo test:php-unit-tests
          - fi
          # Drupal 9 readiness checks.
          - echo "Drupal-check custom modules for Drupal 9 readiness"
          - if [ "$(ls -A docroot/modules/custom/)" ]; then
          - ./vendor/bin/drupal-check ./docroot/modules/custom/
          - fi
          # Output domain to hosts file.
          - printf "127.0.0.1 tests.site.local" >> /etc/hosts
          - cd ./docroot
          # Set script to continue on failure.
          - set +e
          # Check for pending security updates.
          - PMSECURITY=$(../vendor/bin/drush pm:security 2>&1)
          - echo ${PMSECURITY}
          - if grep -vq '[success]' <<< ${PMSECURITY} ; then
          - exit 1
          - fi
          # Set script to stop on failure.
          - set -e
          # Install site using options to disable email notification.
          - echo "\$config['system.mail']['interface']['default'] = 'test_mail_collector';" >> ./sites/default/settings.php
          - /usr/bin/env PHP_OPTIONS="-d sendmail_path=$(which true)" ../vendor/bin/drush site-install mis_profile install_configure_form.enable_update_status_module=NULL install_configure_form.enable_update_status_emails=NULL --verbose --yes --db-url=mysql://drupal:drupal@127.0.0.1:3306/drupal
          - ../vendor/bin/drush status
          - ../vendor/bin/drush sget system.test_mail_collector
          - ../vendor/bin/drush sql-dump --extra-dump=--no-tablespaces > ../vendor/bin/db.sql
          - cd ..
        services:
          - mysql
        artifacts:
          - bin/*
          - tests/**
          - vendor/**
          - docroot/**
    - parallel:
      - step:
          script:
            - ls -l
            - ls -l ./vendor/bin
            - cd docroot
            - ../vendor/bin/drush sqlc < ../vendor/bin/db.sql
            - ../vendor/bin/drush status
            - ../vendor/bin/drush -vvv --debug runserver 8080 &
            - sleep 3
            - cd ..
            # Drupal accessibility tests
            - echo "Accessibility tests"
            - pa11y --version
            - ./tests/pa11y/pa11y-review.sh http://127.0.0.1:8080/themes/contrib/rain_theme/dist/style-guide/section-components.html
            # Drupal behat tests
            - echo "Behat tests"
            - ./tests/behat/behat-run.sh http://127.0.0.1:8080
          services:
            - mysql
      - step:
          caches:
            - docker
          script:
            - cd docroot
            - ../vendor/bin/drush sqlc < ../vendor/bin/db.sql
            - ../vendor/bin/drush status
            - ../vendor/bin/drush -vvv --debug runserver 172.17.0.1:8080 &
            - cd ..
            # OWASP Zap Baseline report
            - echo "OWASP ZAP Baseline report"
            - docker version
            # Set script to continue on failure.
            - set +e
            - ln -s $(pwd) /zap/wrk
            - ls -l /zap/wrk/
            - CMD=$(/zap/zap-baseline.py -d -c owasp-zap.conf -p owasp-zap-progress.json -t http://172.17.0.1:8080) && echo ${CMD}|| ( slackcli -h alerts-mis-devops -e ":lock:" -m "https://bitbucket.org/mediacurrent/${BITBUCKET_REPO_SLUG}/addon/pipelines/home#!/results/$BITBUCKET_BUILD_NUMBER - ${BITBUCKET_BRANCH} - OWASP Zap Baseline report \`\`\`${CMD}\`\`\`" && echo ${CMD} && exit 1 )
            # Set script to stop on failure.
            - set -e
            # Run Security Review checks
            - cd docroot
            # Check security review.
            - ../vendor/bin/drush en security_review
            - SECURITYREVIEW=$(../vendor/bin/drush secrev --skip=failed_logins,file_perms,views_access,trusted_hosts,field 2>&1)
            - echo ${SECURITYREVIEW}
            - if grep -q 'failed' <<< ${SECURITYREVIEW} ; then
            - exit 1
            - fi
          services:
            - docker
            - mysql

definitions:
  caches:
    composer-project-vendor: vendor/
    visual-regression-ci-reference: tests/visual-regression/backstop_data/ci_reference
    visual-regression-node-modules: tests/visual-regression/node_modules
  services:
    docker:
      memory: 2048
    mysql:
      image: mysql:5.7
      environment:
        MYSQL_DATABASE: 'drupal'
        MYSQL_RANDOM_ROOT_PASSWORD: 'yes'
        MYSQL_USER: 'drupal'
        MYSQL_PASSWORD: 'drupal'

```

