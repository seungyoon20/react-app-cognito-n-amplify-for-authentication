import React from 'react';
import {Button} from 'react-bootstrap';
import {SyncIcon} from '@primer/octicons-react';

export default ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
	<Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
		{isLoading && <SyncIcon size={24} />}
		{!isLoading ? text : loadingText}
	</Button>
);