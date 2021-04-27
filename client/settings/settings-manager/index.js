/** @format */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from 'react';

/**
 * Internal dependencies
 */
import PaymentMethods from '../../payment-methods';
import GeneralSettings from 'settings/general-settings';

const SettingsSection = ( { title, description, children } ) => (
	<li className="settings-manager__section">
		<div className="settings-manager__section-details">
			<h2>{ title }</h2>
			{ description && <p>{ description }</p> }
		</div>
		<div className="settings-manager__controls">{ children }</div>
	</li>
);

const SettingsManager = ( {
	enabledPaymentMethodIds: initialEnabledPaymentMethodIds,
} ) => {
	const [ enabledPaymentMethodIds, setEnabledPaymentMethodIds ] = useState(
		initialEnabledPaymentMethodIds
	);

	return (
		<ul className="settings-manager">
			<SettingsSection
				title={ __(
					'Payments accepted on checkout',
					'woocommerce-payments'
				) }
				description={ __(
					'Add and edit payments available to customers at checkout. Drag & drop to reorder.',
					'woocommerce-payments'
				) }
			>
				<PaymentMethods
					enabledMethodIds={ enabledPaymentMethodIds }
					onEnabledMethodIdsChange={ setEnabledPaymentMethodIds }
				/>
			</SettingsSection>
			<SettingsSection title={ __( 'Settings', 'woocommerce-payments' ) }>
				<GeneralSettings />
			</SettingsSection>
		</ul>
	);
};

export default SettingsManager;
