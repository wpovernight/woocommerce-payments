/** @format */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './index.scss';
import SettingsSection from '../settings-section';
import { getPaymentSettingsUrl } from '../../utils';
import GiropaySettings from './giropay-settings';
import DigitalWalletsSettings from './digital-wallets-settings';
import Banner from '../../banner';

/* eslint-disable camelcase */
const methods = {
	woocommerce_payments_giropay: {
		title: 'giropay',
		description: () => (
			<>
				{ /* Whoever picks this up will need to translate these strings */ }
				<h2>giropay</h2>
				<p>giropay description.</p>
			</>
		),
		controls: () => <GiropaySettings />,
	},
	woocommerce_payments_digital_wallets: {
		title: '1-click checkouts',
		description: () => (
			<>
				<h2>{ __( '1-click checkouts', 'woocommerce-payments' ) }</h2>
				<p>
					{ __(
						'Decide how buttons for digital wallets like Apple Pay and Google Pay are displayed in your store.',
						'woocommerce-payments'
					) }
				</p>
				<p>
					<ExternalLink href="https://developer.apple.com/design/human-interface-guidelines/apple-pay/overview/introduction/">
						{ __(
							'View Apple Pay Guidelines',
							'woocommerce-payments'
						) }
					</ExternalLink>
				</p>
				<p>
					<ExternalLink href="https://developers.google.com/pay/api/web/guides/brand-guidelines">
						{ __(
							'View Google Pay Guidelines',
							'woocommerce-payments'
						) }
					</ExternalLink>
				</p>
			</>
		),
		controls: () => <DigitalWalletsSettings />,
	},
};
/* eslint-enable camelcase */

const PaymentMethodSettings = ( { methodId } ) => {
	const method = methods[ methodId ];

	if ( ! method ) {
		return (
			<p>
				{ __(
					'Invalid payment method ID specified.',
					'woocommerce-payments'
				) }
			</p>
		);
	}

	const { title, description: Description, controls: Controls } = method;

	return (
		<div className="payment-method-settings">
			<Banner />

			<h2 className="payment-method-settings__breadcrumbs">
				<a href={ getPaymentSettingsUrl() }>WooCommerce Payments</a>{ ' ' }
				&gt; <span>{ title }</span>
			</h2>

			<SettingsSection Description={ Description }>
				<Controls />
			</SettingsSection>
		</div>
	);
};

export default PaymentMethodSettings;
