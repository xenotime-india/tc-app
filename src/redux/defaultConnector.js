import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActionCreators from './actions/user';
import * as EventActionCreators from './actions/event';

export default function defaultConnector(WrappedComponent) {
  class ConnectedComponent extends React.Component {
    render() {
      return (
        <WrappedComponent
          componentName={WrappedComponent.name}
          {...this.props}
        />
      );
    }
  }

  function mapStateToProps(state) {
    const { user, event, network } = state;
    const { profile, oidc } = user || {};
    let { auth0 } = profile || {};
    if (auth0) {
      auth0 = Array.isArray(auth0) ? auth0[0] : auth0;
    } else {
      auth0 = {
        picture: null,
      };
    }
    return {
      user,
      profile,
      token: oidc,
      profilePic: auth0.picture ? { uri: auth0.picture } : null,
      isLoggedIn: profile && profile.id ? true : false,
      isTeacher: profile && profile.userType === 'Teacher' ? true : false,
      event,
      network,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      userActions: bindActionCreators(UserActionCreators, dispatch),
      EventActions: bindActionCreators(EventActionCreators, dispatch),
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedComponent);
}
