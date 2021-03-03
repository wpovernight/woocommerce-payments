/** @format **/

/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './style.scss';
import InstantDepositModal from './modal';
import Currency from "@woocommerce/currency";
// TODO: Use the proper WCPay currency.
const currency = new Currency();

// eslint-disable-next-line camelcase
const InstantDepositButton = ( { balance: { amount, fee, net, transaction_ids } } ) => {
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ inProgress, setInProgress ] = useState( false );
	const { createSuccessNotice, createErrorNotice } = useDispatch('core/notices' );

	// TODO: Use wp.data
	const submit = async () => {
		try {
			setInProgress( true );
			await apiFetch( {
				path: '/wc/v3/payments/deposits',
				method: 'POST',
				data: {
					type: 'instant',
					// eslint-disable-next-line camelcase
					transaction_ids,
				},
			} );
			// TODO: Full-reload the page so the new deposit appears?
			createSuccessNotice(
				sprintf(
					/* translators: %s: Monetary amount to deposit */
					__(
					'Instant deposit for %1$s in transit.', 'woocommerce-payments'),
					currency.formatCurrency( net / 100 )
				)
			);
		} catch ( err ) {
			createErrorNotice(
				__(
					'The deposit was not successful.',
					'woocommerce-payments'
				)
			);
		} finally {
			setInProgress( false );
			setModalOpen( false );
		}
	};

	const onClose = () => {
		setModalOpen( false );
	}

	return (
		<>
			<Button isDefault onClick={ () => setModalOpen( true ) }>
				{ __( 'Instant deposit', 'woocommerce-payments' ) }
			</Button>
			{ isModalOpen && (
				<InstantDepositModal
					amount={ amount }
					fee={ fee }
					net={ net }
					inProgress={ inProgress }
					onSubmit={ submit }
					onClose={ onClose }
				/>
			) }
		</>
	);
};

export default InstantDepositButton;
