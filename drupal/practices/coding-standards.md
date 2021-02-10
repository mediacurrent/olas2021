The primary resource for Drupal coding standards can be found at [https://www.drupal.org/docs/develop/standards](https://www.drupal.org/docs/develop/standards). This page is an excellent resource that goes into great detail on a variety of topics and should a part of the onboarding process for developers, and especially so for developers who are unfamiliar with Drupal.

# Automatically Testing Coding Standards

The [Coder](https://www.drupal.org/project/coder) project includes configurations for the PHP_CodeSniffer library, allowing standards tests with `phpcs` and can automatically fix issues with `phpcbf`. To use Coder, add the following to your project's composer dependencies:

```bash
composer require drupal/coder
```

Once coder has been installed to your project, you can use it to test the project's custom code using Drupal's coding standard. You can do this from the root of the project with a command similar to the following:

```bash
./vendor/bin/phpcs --standard=./vendor/drupal/coder/coder_sniffer/Drupal --extensions=php,module,inc,install,test,profile,theme,info,txt,md,yml,yaml ./web/modules/custom
```

That is a very verbose command to remember however, so it can be helpful to place a more readily executable version inside a script. For instance, the following bash script could be placed in a new `tests` directory beside the `web` docroot at the root of the repo. Once that's been created, you can run tests with `./tests/code-sniffer.sh ./web` from the root of the repo.

## code-sniffer.sh

```bash
#!/bin/bash -e

# Help message to explain how to use the command.
usage()
{
cat << EOF
Usage: ./code-sniffer.sh /path/to/docroot

ARGUMENTS:
   $SITE_PATH: Absolute path to Drupal docroot.
EOF
}

# Store arg 1 as the site path to test.
SITE_PATH=$1

# Exit if options aren't set.
if [[ -z $SITE_PATH ]]; then
  usage
  exit 1;
fi

# Attempt to use the project's version of phpcs from vendor/bin, or falllback to the system-wide version.
if [ -f ./vendor/bin/phpcs ]; then
  PHPCS='./vendor/bin/phpcs --standard=./vendor/drupal/coder/coder_sniffer/Drupal'
elif [ -f ../vendor/bin/phpcs ]; then
  PHPCS='../vendor/bin/phpcs --standard=../vendor/drupal/coder/coder_sniffer/Drupal'
else
  PHPCS='phpcs --standard=Drupal'
fi

# Test custom modules.
if [ -d ${SITE_PATH}/modules/custom ]; then
  echo "Running coding standards tests for custom modules."
  ${PHPCS} --extensions=php,module,inc,install,test,profile,theme,info,txt,md,yml ${SITE_PATH}/modules/custom
  echo "Running PHP lint for custom modules."
  find ${SITE_PATH}/modules/custom \( -name "*.module" -o -name "*.install" -o -name "*.php" \) -print0 | xargs -0 -n1 -P8 php -l 1>/dev/null
fi

# Test custom profiles.
if [ -d ${SITE_PATH}/profiles/custom ]; then
  echo "Running coding standards tests for custom profiles."
  ${PHPCS} --extensions=php,module,inc,install,test,profile,theme,info,txt,md,yml ${SITE_PATH}/profiles/custom
  echo "Running PHP lint for custom profiles."
  find ${SITE_PATH}/profiles/custom \( -name "*.module" -o -name "*.install" -o -name "*.profile" -o -name "*.php" \) -print0 | xargs -0 -n1 -P8 php -l 1>/dev/null
fi

# Test custom themes (ignore node_modules installed by NodeJS build tools).
if [ -d ${SITE_PATH}/themes/custom ]; then
  echo "Running coding standards tests for custom themes."
  ${PHPCS} --ignore=/themes/custom/*/node_modules/,/themes/custom/*/src/styleguide/ --extensions=php,module,inc,install,test,profile,theme,info,txt,md,yml ${SITE_PATH}/themes/custom
  echo "Running PHP lint for custom themes."
  find ${SITE_PATH}/themes/custom \( -name "*.theme" -not -path "${SITE_PATH}/themes/custom/*/node_modules/*" \) -print0 | xargs -0 -n1 -P8 php -l 1>/dev/null
fi
```
