
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import 'payments-api/payments-data-store';

export const isInTestMode = ( defaultMode = false ) => {
	if ( 'undefined' === typeof wcpaySettings ) {
		return defaultMode;
	}
	return wcpaySettings.testMode || defaultMode;
};
