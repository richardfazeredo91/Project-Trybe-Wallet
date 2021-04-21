import React from 'react';
import Header from '../components/Header';
import Expensies from '../components/Expensies';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expensies />
      </>
    );
  }
}

export default Wallet;
