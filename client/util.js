
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import 'payments-api/payments-data-store';

export const isInTestMode = ( defaultMode = true ) => {
	if ( 'undefined' === typeof wcpaySettings ) {
		return defaultMode;
	}
	return wcpaySettings.test_mode || defaultMode;
};
