/** @format */
/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { CardHeader } from '@wordpress/components';
import { WCPayLogo, RecommendedRibbon } from '@woocommerce/tasks';

import './banner.scss';

const Banner = ( { style } ) => {
	let logoWidth,
		logoHeight,
		showPill,
		className = 'woocommerce-payments-banner';
	if ( 'account-page' === style ) {
		logoWidth = 196;
		logoHeight = 65;
		showPill = true;
		className += ' account-page';
	} else {
		logoWidth = 257;
		logoHeight = 70;
		showPill = false;
	}

	return (
		<CardHeader className={ className }>
			<WCPayLogo width={ logoWidth } height={ logoHeight } />
			{ showPill && <RecommendedRibbon isPill={ true } /> }
		</CardHeader>
	);
};

export default Banner;
