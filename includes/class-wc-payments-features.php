<?php
/**
 * Class WC_Payments_Features
 *
 * @package WooCommerce\Payments
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use Automattic\WooCommerce\Admin\Features\Onboarding;

/**
 * WC Payments Features class
 */
class WC_Payments_Features {
	const UPE_FLAG_NAME = '_wcpay_feature_upe';

	const WCPAY_SUBSCRIPTIONS_FLAG_NAME = '_wcpay_feature_subscriptions';

	/**
	 * Checks whether the Giropay gateway feature is enabled
	 *
	 * @return bool
	 */
	public static function is_giropay_enabled() {
		return '1' === get_option( '_wcpay_feature_giropay', '0' );
	}

	/**
	 * Checks whether the Sepa gateway feature is enabled
	 *
	 * @return bool
	 */
	public static function is_sepa_enabled() {
		return '1' === get_option( '_wcpay_feature_sepa', '0' );
	}

	/**
	 * Checks whether the Sofort gateway feature is enabled
	 *
	 * @return bool
	 */
	public static function is_sofort_enabled() {
		return '1' === get_option( '_wcpay_feature_sofort', '0' );
	}

	/**
	 * Checks whether the UPE gateway is enabled
	 *
	 * @return bool
	 */
	public static function is_upe_enabled() {
		return '1' === get_option( self::UPE_FLAG_NAME, '0' );
	}

	/**
	 * Checks whether the UPE gateway is enabled
	 *
	 * @return bool
	 */
	public static function did_merchant_disable_upe() {
		return 'disabled' === get_option( self::UPE_FLAG_NAME, '0' );
	}

	/**
	 * Checks whether the UPE settings redesign is enabled
	 *
	 * @return bool
	 */
	public static function is_upe_settings_preview_enabled() {
		return '1' === get_option( '_wcpay_feature_upe_settings_preview', '1' );
	}

	/**
	 * Checks whether the customer multi-currency feature is enabled
	 *
	 * @return bool
	 */
	public static function is_customer_multi_currency_enabled() {
		return '1' === get_option( '_wcpay_feature_customer_multi_currency', '1' );
	}

	/**
	 * Checks whether Account Overview page is enabled
	 *
	 * @return bool
	 */
	public static function is_account_overview_task_list_enabled() {
		return get_option( '_wcpay_feature_account_overview_task_list' );
	}

	/**
	 * Checks whether WCPay Subscriptions is enabled.
	 *
	 * @return bool
	 */
	public static function is_wcpay_subscriptions_enabled() {
		return '1' === get_option( self::WCPAY_SUBSCRIPTIONS_FLAG_NAME, '0' );
	}

	/**
	 * Enables the WCPay Subscriptions feature when a merchant opts to sell subscription products via the WC onboarding profile.
	 *
	 * At launch only US-based stores are eligible.
	 */
	public static function maybe_enable_wcpay_subscriptions() {
		$base_location = wc_get_base_location();

		// Only stores based in the US which enabled the Subscriptions products are eligible for the feature.
		if ( ! isset( $base_location['country'] ) || 'US' !== $base_location['country'] ) {
			return;
		}

		$onboarding_data = get_option( Onboarding::PROFILE_DATA_OPTION, [] );

		// Switch on the feature if the merchant chose the subscriptions product type.
		if ( isset( $onboarding_data['product_types'] ) && is_array( $onboarding_data['product_types'] ) && in_array( 'subscriptions', $onboarding_data['product_types'], true ) ) {
			update_option( self::WCPAY_SUBSCRIPTIONS_FLAG_NAME, '1' );
		}
	}

	/**
	 * Returns feature flags as an array suitable for display on the front-end.
	 *
	 * @return bool[]
	 */
	public static function to_array() {
		return array_filter(
			[
				'upe'                     => self::is_upe_enabled(),
				'upeSettingsPreview'      => self::is_upe_settings_preview_enabled(),
				'multiCurrency'           => self::is_customer_multi_currency_enabled(),
				'accountOverviewTaskList' => self::is_account_overview_task_list_enabled(),
				'subscriptions'           => self::is_wcpay_subscriptions_enabled(),
			]
		);
	}
}
