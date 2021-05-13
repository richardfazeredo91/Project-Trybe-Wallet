import React from 'react';
import PropTypes from 'prop-types';
import Login from '../components/Login/Login';

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Login history={ history } />
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Home;
