// @flow
import { connect } from 'react-redux';
import { startSubmit } from 'redux-form';
import SignUp from './SignUp';
import { signup } from './../../actions/signup';

export default connect(
  null,
  { signup, startSubmit },
)(SignUp);
