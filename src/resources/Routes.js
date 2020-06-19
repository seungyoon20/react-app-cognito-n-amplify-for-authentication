import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import Login from './Login';
import Signup from './Signup';
// import Confirm from './Confirm';
import ForgetPassword from './ForgetPassword';
// import UpdateUserAttr from './UpdateUserAttr';


export default ({ childProps }) => (
	<Switch>
		<AppliedRoute path="/login" exact component={Login} props={childProps} />
		<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        {/* <AppliedRoute path="/confirm/:username" exact component={Confirm} props={childProps} /> */}
		<AppliedRoute path="/forget-password" exact component={ForgetPassword} props={childProps} />
		{/* <AppliedRoute path="/updateUserAttr" exact component={UpdateUserAttr} props={childProps}/> */}
		{/* Finally, catch all unmatched routes */}
		{/* <Route component={NotFound} /> */}
	</Switch>
);