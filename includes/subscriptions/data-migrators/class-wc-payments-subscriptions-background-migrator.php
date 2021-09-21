<?php
/**
 * Class WC_Payments_Subscriptions_Background_Migrator
 *
 * @package WooCommerce\Payments
 */

defined( 'ABSPATH' ) || exit;

/**
 * WC_Payments_Subscriptions_Background_Migrator class
 */
abstract class WC_Payments_Subscriptions_Background_Migrator extends WCS_Background_Repairer {

	/**
	 * The default batch size.
	 *
	 * @var int
	 */
	protected $batch_size = 100;

	/**
	 * Handle the individual item that needs updating.
	 *
	 * @param mixed $item The item that needs to be handled.
	 */
	abstract public function handle_item( $item );

	/**
	 * Gets the WP_Query object which can be used to find items which need updating.
	 *
	 * @param int $items_per_page The number of items to return per page. Optional. Default is 0 and represents a full batch.
	 * @param int $page           The page of results to get. 0 based. Optional. Default is 0 - first page.
	 * @return WP_Query The WP_Query object used to find items that need updating.
	 */
	abstract public function get_query( $items_per_page, $page = 0 );

	/**
	 * Handles an individual item.
	 * Because the extending classes aren't exclusively repairing items, this function simply acts as a wrapper repair_item().
	 *
	 * @param mixed $item The individial item which needs to be handled (updated/migrated/repaired).
	 */
	protected function repair_item( $item ) {
		$this->handle_item( $item );
	}

	/**
	 * Schedules the background job to start processing items.
	 * Because the extending classes aren't exclusively repairing items, this function simply acts as a wrapper for schedule_repair().
	 */
	public function schedule_updates() {
		$this->schedule_repair();
	}

	/**
	 * Gets a batch of items to update/repair.
	 *
	 * @param  int $page The page of items to return.
	 * @return array An array of items to update/repair.
	 */
	protected function get_items_to_repair( $page ) {
		return $this->get_query( $this->batch_size, $page )->posts;
	}

	/**
	 * Gets the number of items to be updated before this process is considered finished.
	 *
	 * @return int The total number of items that need updating.
	 */
	protected function get_items_to_update_count() {
		// When getting the total count, just get a batch of size 1 for performance reasons and use the number of found posts.
		return $this->get_query( 1 )->found_posts;
	}

	/**
	 * Determines if this background processor has items that need to be updated.
	 *
	 * @return bool Whether the background processor has items it still needs to update.
	 */
	public function has_items_to_update() {
		return $this->get_items_to_update_count() > 0;
	}
}