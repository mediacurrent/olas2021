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