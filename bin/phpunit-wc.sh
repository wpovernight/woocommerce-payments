#!/usr/bin/env bash

if [[ ${RUN_WC_TESTS} != 1 ]]; then
	exit
fi

cd ../woocommerce
phpunit -c phpunit.xml
