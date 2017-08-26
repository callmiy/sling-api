// @flow
import { startSubmit } from 'redux-form';
import { connect } from 'react-redux';
import Login from './Login';
import login from './../../actions/login';

export default connect(null, { login, startSubmit })(Login);
