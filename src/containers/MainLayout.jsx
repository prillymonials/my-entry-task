import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doLogout } from '../actions/auth';
import { setSidebar, goToHome, goToMe } from '../actions/route';
import { fetchChannelList } from '../actions/search';
import Post from './Post';
import MainHeader from '../components/MainHeader';
import Search from './Search';
import PostDetail from './PostDetail';
import '../styles/MainLayout.scss';
import MyPost from './MyPost';

class MainLayout extends Component {
  static propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
    setSidebar: PropTypes.func.isRequired,
    fetchChannelList: PropTypes.func.isRequired,
    goToHome: PropTypes.func.isRequired,
    goToMe: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchChannelList: fetchData } = this.props;
    fetchData();
  }

  setMainLayoutRef = (ref) => {
    this.mainLayoutRef = ref;
  };

  handleToggleSidebar = () => {
    const { isSidebarOpen, setSidebar: setSidebarProps } = this.props;

    setSidebarProps(!isSidebarOpen);
  };

  renderByRoute() {
    const { route } = this.props;

    switch (route) {
      case 'home':
        return <Post />;
      case 'detail':
        return <PostDetail />;
      case 'me':
        return <MyPost />;
      default:
        return null;
    }
  }

  render() {
    const {
      avatarUrl,
      handleLogout,
      isSidebarOpen,
      route,
      goToHome: handleGoToHome,
      goToMe: handleGoToMe,
    } = this.props;

    const openClassName = isSidebarOpen ? 'open' : '';

    return (
      <div className={`app-main-layout ${openClassName}`} ref={this.setMainLayoutRef}>
        <MainHeader
          route={route}
          userAvatarUrl={avatarUrl}
          handleLogout={handleLogout}
          handleToggleSidebar={this.handleToggleSidebar}
          handleGoToHome={handleGoToHome}
          handleGoToMe={handleGoToMe}
        />
        <Search />
        <div className="app-main-content">{this.renderByRoute()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.route,
  avatarUrl: state.auth.user.avatarUrl,
});

const mapDispatchToProps = {
  handleLogout: doLogout,
  setSidebar,
  fetchChannelList,
  goToHome,
  goToMe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayout);
