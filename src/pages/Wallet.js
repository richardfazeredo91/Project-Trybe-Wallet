import React from 'react';
import Header from '../components/Header/Header';
import Expenses from '../components/Expenses/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expenses />
      </>
    );
  }
}

export default Wallet;
