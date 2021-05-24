/** @format */
/**
 * External dependencies
 */
import { Card } from '@woocommerce/components';
import { Button, Notice } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import { WCPayCard, WCPayCardFooter, WCPayCardBody } from '@woocommerce/tasks';

/**
 * Internal dependencies
 */
import './style.scss';
import Banner from '../banner';
import Page from 'components/page';
import strings from './strings';
import wcpayTracks from 'tracks';

const StepNumber = ( props ) => (
	<span className="wcpay-connect-account-page-step-number">
		{ props.children }
	</span>
);

const TermsOfService = () => (
	<span className="wcpay-connect-account-page-terms-of-service">
		{ strings.terms }
	</span>
);

const ConnectPageError = () => {
	if ( ! wcpaySettings.errorMessage ) {
		return null;
	}
	return (
		<Notice
			className="wcpay-connect-error-notice"
			status="error"
			isDismissible={ false }
		>
			{ wcpaySettings.errorMessage }
		</Notice>
	);
};

const ConnectPageOnboardingSteps = () => {
	return (
		<>
			<h2>{ strings.stepsHeading }</h2>
			<div className="connect-page-onboarding-steps">
				<div className="connect-page-onboarding-steps-item">
					<StepNumber>1</StepNumber>
					<h3>{ strings.step1.heading }</h3>
					<p>{ strings.step1.description }</p>
				</div>
				<div className="connect-page-onboarding-steps-item">
					<StepNumber>2</StepNumber>
					<h3>{ strings.step2.heading }</h3>
					<p>{ strings.step2.description }</p>
				</div>
				<div className="connect-page-onboarding-steps-item">
					<StepNumber>3</StepNumber>
					<h3>{ strings.step3.heading }</h3>
					<p>{ strings.step3.description }</p>
				</div>
			</div>
		</>
	);
};

const ConnectPageOnboardingDisabled = () => (
	<p>
		{ strings.onboardingDisabled[ 0 ] }
		<br />
		{ strings.onboardingDisabled[ 1 ] }
	</p>
);

const CardBody = () => {
	const handleLearnMoreClick = () => {
		wcpayTracks.recordEvent(
			wcpayTracks.events.CONNECT_ACCOUNT_LEARN_MORE
		);
	};

	return (
		<WCPayCardBody
			heading={ strings.onboarding.heading }
			description={ strings.onboarding.description }
			linkOnClick={ handleLearnMoreClick }
		/>
	);
};
const CardFooter = () => {
	const [ isSubmitted, setSubmitted ] = useState( false );
	const handleSetup = () => {
		setSubmitted( true );
		wcpayTracks.recordEvent( wcpayTracks.events.CONNECT_ACCOUNT_CLICKED, {
			// eslint-disable-next-line camelcase
			wpcom_connection: wcpaySettings.isJetpackConnected ? 'Yes' : 'No',
		} );
	};
	return (
		<WCPayCardFooter
			tosComponent={ () => <TermsOfService /> }
			buttonComponent={ () => (
				<Button
					isPrimary
					isBusy={ isSubmitted }
					disabled={ isSubmitted }
					onClick={ handleSetup }
					href={ wcpaySettings.connectUrl }
				>
					{ strings.button }
				</Button>
			) }
		/>
	);
};

const ConnectAccountPageVariant = () => {
	useEffect( () => {
		wcpayTracks.recordEvent( wcpayTracks.events.CONNECT_ACCOUNT_VIEW, {
			path: 'payments_connect_v2',
		} );
	}, [] );

	return (
		<div className="connect-account-page-variant">
			<Page isNarrow className="connect-account">
				<ConnectPageError />
				<WCPayCard>
					<Banner style="account-page" />
					{ wcpaySettings.onBoardingDisabled ? (
						<ConnectPageOnboardingDisabled />
					) : (
						<>
							<CardBody />
							<CardFooter />
						</>
					) }
				</WCPayCard>
				{ ! wcpaySettings.onBoardingDisabled && (
					<Card className="connect-account__steps">
						<ConnectPageOnboardingSteps />
					</Card>
				) }
			</Page>
		</div>
	);
};

export default ConnectAccountPageVariant;
