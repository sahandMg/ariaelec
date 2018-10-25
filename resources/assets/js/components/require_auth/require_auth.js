import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PropTypes from 'prop-types';

export default function(ComposedComponent,role) {

  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
        this.props.checkAuthState();
      if ( (!this.props.isAuthenticated) || ( this.props.userRole !== role ) ) {
          this.context.router.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if ( (!nextProps.isAuthenticated) || ( this.props.userRole !== role ) ) {
          this.context.router.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.auth.token !== null,
            userRole: state.auth.userRole
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            checkAuthState: () => dispatch( actions.authCheckState() )
        };
    };

    return connect(mapStateToProps,mapDispatchToProps)(Authentication);
}
