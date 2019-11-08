
/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';

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

export const updateNotice = ( select, display = false, newContent = '' ) => {
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
		note.status = display ? note.status : 'actioned';
		note.actions = [ {
			name: 'settings',
			label: 'Open Settings',
			status: 'unactioned',
			primary: false,
			url: addQueryArgs( 'admin.php', {
				page: 'wc-settings',
				tab: 'checkout',
				section: 'woocommerce_payments',
			} ),
		} ];
	}
};
