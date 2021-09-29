/**
 * Internal dependencies
 */
import { getConfig } from 'utils/checkout';
import woopayButtonSrc from 'wcpay/../assets/images/buy-now-woopay.png';

const WooPay = ( { isStatic, api } ) => {
	const image = <img src={ woopayButtonSrc } alt="Buy now with WooPay" />;
	if ( isStatic ) {
		return image;
	}

	const onClick = () => {
		api.initWooPay().then( ( response ) => {
			window.location = response.url;
		} );
	};

	return <button onClick={ onClick }>{ image }</button>;
};

const woopayPaymentMethod = ( api ) => ( {
	name: 'woopay',
	content: <WooPay api={ api } />,
	edit: <WooPay isStatic />,
	canMakePayment: () => true,
	paymentMethodId: 'woocommerce_payments',
	supports: {
		features: getConfig( 'features' ),
	},
} );

export default woopayPaymentMethod;
