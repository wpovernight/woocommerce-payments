
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

export const updateNotice = ( select, newContent ) => {
	const { getNotes } = select( 'wc-api' );
	const alertsQuery = {
		page: 1,
		// eslint-disable-next-line camelcase
		per_page: 25,
		type: 'error,update',
		status: 'unactioned',
	};
	const notesFilter = note => 'woocommerce-payments-test-mode-active' === note.name && 'woocommerce-payments' === note.source;
	const notes = getNotes( alertsQuery ).filter( notesFilter );

	if ( notes && notes.length > 0 ) {
		const note = notes[ 0 ];
		note.content = newContent;
	}
};
