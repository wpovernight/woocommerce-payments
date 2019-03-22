#!/usr/bin/env bash

if [[ ${TRAVIS_PHP_VERSION:0:3} == "5.2" ]] ||
	[[ ${TRAVIS_PHP_VERSION:0:3} == "5.3" ]] ||
	[[ ${TRAVIS_PHP_VERSION:0:3} == "5.6" ]] ||
	[[ ${TRAVIS_PHP_VERSION:0:3} == "7.0" ]]; then
	phpunit -c phpunit.xml
else
  ./vendor/bin/phpunit
fi
