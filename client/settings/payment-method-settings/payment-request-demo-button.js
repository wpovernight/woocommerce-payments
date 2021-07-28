/** @format */
/**
 * External dependencies
 */
import { React, useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
	PaymentRequestButtonElement,
	useStripe,
} from '@stripe/react-stripe-js';

/**
 * Internal dependencies
 */
import {
	usePaymentRequestButtonType,
	usePaymentRequestButtonSize,
	usePaymentRequestButtonTheme,
} from '../../data';
import InlineNotice from '../../components/inline-notice';
import { shouldUseGooglePayBrand } from '../../payment-request/utils';

const HelpText = () => {
	let browser = 'Google Chrome';
	let paymentMethodName = 'Google Pay';

	if ( shouldUseGooglePayBrand() ) {
		browser = 'Safari';
		paymentMethodName = 'Apple Pay';
	}

	return (
		<p className="payment-method-settings__preview-help-text">
			{ sprintf(
				__(
					/* translators: %1: Payment method name %2: Browser name. */
					'To preview the %1$s button, view this page in the %2$s browser.',
					'woocommerce-payments'
				),
				paymentMethodName,
				browser
			) }
		</p>
	);
};

const sizeToPxMappings = {
	default: 40,
	medium: 48,
	large: 56,
};

const PaymentRequestDemoButton = () => {
	const stripe = useStripe();
	const [ buttonType ] = usePaymentRequestButtonType();
	const [ size ] = usePaymentRequestButtonSize();
	const [ theme ] = usePaymentRequestButtonTheme();
	const [ paymentRequest, setPaymentRequest ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		if ( ! stripe ) {
			return;
		}

		// Create a preview for payment button. The label and its total are placeholders.
		const stripePaymentRequest = stripe.paymentRequest( {
			country: 'US',
			currency: 'usd',
			total: {
				label: __( 'Total', 'woocommerce-payments' ),
				amount: 99,
			},
			requestPayerName: true,
			requestPayerEmail: true,
		} );

		// Check the availability of the Payment Request API.
		stripePaymentRequest.canMakePayment().then( ( result ) => {
			if ( result ) {
				setPaymentRequest( stripePaymentRequest );
			}
			setIsLoading( false );
		} );
	}, [ stripe, setPaymentRequest, setIsLoading ] );

	/**
	 * If stripe is loading, then display nothing.
	 * If stripe finished loading but payment request button failed to load (null), display info section.
	 * If stripe finished loading and payment request button loads, display the button.
	 */
	if ( isLoading ) {
		return null;
	}

	if ( ! paymentRequest ) {
		return (
			<InlineNotice status="info" isDismissible={ false }>
				To preview the buttons, ensure your device is configured to
				accept Apple Pay, or Google Pay, and view this page using the
				Safari or Chrome browsers.
			</InlineNotice>
		);
	}

	return (
		<div className="payment-method-settings__preview">
			<PaymentRequestButtonElement
				// Since this is preview, we don't want the user to open up the browser's payment popup.
				onClick={ ( e ) => {
					e.preventDefault();
				} }
				options={ {
					paymentRequest: paymentRequest,
					style: {
						paymentRequestButton: {
							type: buttonType,
							theme: theme,
							height: sizeToPxMappings[ size ] + 'px',
						},
					},
				} }
			/>
			<HelpText />
		</div>
	);
};

export default PaymentRequestDemoButton;
