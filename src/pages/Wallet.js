import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <section>
          <WalletForm />
        </section>
        <section>
          <Table />
        </section>
      </>
    );
  }
}

export default Wallet;
