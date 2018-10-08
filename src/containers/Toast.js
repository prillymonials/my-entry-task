import { connect } from 'react-redux';
import Toast from '../components/Toast';

const mapStateToProps = state => ({
  show: state.toast,
});

export default connect(mapStateToProps)(Toast);
