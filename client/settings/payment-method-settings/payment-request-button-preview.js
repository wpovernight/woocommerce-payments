/** @format */

/**
 * External dependencies
 */
import { React, useMemo } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

/**
 * Internal dependencies
 */
import PaymentRequestDemoButton from './payment-request-demo-button';
import { getPaymentRequestData } from 'payment-request/utils';

/**
 * stripePromise is used to pass into <Elements>'s stripe props.
 * The stripe prop in <Elements> can't be change once passed in.
 * Keeping this outside of <PaymentRequestButtonPreview> so that
 * re-rendering does not change it.
 */

const PaymentRequestButtonPreview = () => {
	const stripePromise = useMemo( () => {
		const stripeSettings = getPaymentRequestData( 'stripe' );
		return loadStripe( stripeSettings.publishableKey, {
			stripeAccount: stripeSettings.accountId,
			locale: stripeSettings.locale,
		} );
	}, [] );

	return (
		<Elements stripe={ stripePromise }>
			<PaymentRequestDemoButton />
		</Elements>
	);
};

export default PaymentRequestButtonPreview;
