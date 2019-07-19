#!/usr/bin/env bash

if [[ $RUN_PHPCS == 1 || $SHOULD_DEPLOY == 1 ]]; then
	exit
fi

if [[ ${TRAVIS_PHP_VERSION:0:3} == "5.2" ]] ||
	[[ ${TRAVIS_PHP_VERSION:0:3} == "5.3" ]] ||
	[[ ${TRAVIS_PHP_VERSION:0:3} == "5.6" ]]; then
	phpunit -c phpunit.xml.dist
elif [[ ${TRAVIS_PHP_VERSION:0:3} == "7.0" ]]; then
	echo "PHPUnit testing with php 7.0"
	php phpunit-6.5.14.phar --version
	php phpunit-6.5.14.phar -c phpunit.xml.dist
	pwd
else
  ./vendor/bin/phpunit
fi
