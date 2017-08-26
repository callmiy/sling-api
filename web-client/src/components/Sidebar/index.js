// @flow
import { connect } from 'react-redux';
import { getCurrentUserRooms } from './../../reducers';
import Sidebar from './Sidebar';
import logout from './../../actions/logout';

export default connect(
  (state) => ({ rooms: getCurrentUserRooms(state) }),
  { logout },
)(Sidebar);
