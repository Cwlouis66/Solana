import React, { useState } from 'react';
import SolanaPriceGraph from './SolanaPriceGraph';

const Swap = () => {
  const [payingCurrency, setPayingCurrency] = useState('SOL');
  const [payingAmount, setPayingAmount] = useState('');
  const [receivingCurrency, setReceivingCurrency] = useState('ETH');
  const [solPrice, setSolPrice] = useState(140.80);

  const currencies = ['ETH', 'SOL', 'USDC', 'BTC'];

  const currencyLogos = {
    ETH: '/eth.png',
    SOL: '/solana.png',
    USDC: '/path/to/usdc-logo.png',
    BTC: '/path/to/btc-logo.png',
  };

  const calculateReceivedAmount = () => {
    if (!payingAmount || isNaN(payingAmount)) return '0';
    return (parseFloat(payingAmount) / solPrice).toFixed(10);
  };

  const CurrencySelector = ({ value, onChange, currencies }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={currencyLogos[value]} 
          alt={`${value} logo`}
          style={{ 
            width: '24px', 
            height: '24px', 
            marginRight: '8px' 
          }} 
        />
        <select
          value={value}
          onChange={onChange}
          style={{ 
            backgroundColor: 'transparent', 
            color: 'white', 
            border: 'none', 
            fontSize: '1rem',
            appearance: 'none'
          }}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <span style={{ color: '#a1a1a1' }}>▼</span>
    </div>
  );

  const ConnectWalletButton = () => (
    <button style={{
      backgroundColor: '#3f4c6b',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '0.9rem',
      cursor: 'pointer'
    }}>
      Connect wallet
    </button>
  );

  return (
    <div style={{ color: 'white', maxWidth: '100%', margin: 'auto', padding: '20px', backgroundColor: '#2C3038', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <div style={{ width: '100%', height: '200px', borderRadius: '8px' }}>
            <SolanaPriceGraph />
          </div>
        </div>
        <div style={{ width: '300px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#a1a1a1' }}>You're Paying</p>
              <ConnectWalletButton />
            </div>
            <div style={{ backgroundColor: 'black', borderRadius: '8px', overflow: 'hidden' }}>
              <CurrencySelector
                value={payingCurrency}
                onChange={(e) => setPayingCurrency(e.target.value)}
                currencies={currencies}
              />
              <input
                type="text"
                value={payingAmount}
                onChange={(e) => setPayingAmount(e.target.value)}
                placeholder="Enter amount"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#a1a1a1', 
                  border: 'none', 
                  fontSize: '1.2rem', 
                  width: '100%', 
                  padding: '10px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img src="/updown.png" alt="Up Down Arrow" style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#a1a1a1' }}>To Receive</p>
              <ConnectWalletButton />
            </div>
            <div style={{ backgroundColor: 'black', borderRadius: '8px', overflow: 'hidden' }}>
              <CurrencySelector
                value={receivingCurrency}
                onChange={(e) => setReceivingCurrency(e.target.value)}
                currencies={currencies}
              />
              <p style={{ fontSize: '1.2rem', margin: '0', padding: '10px', color: 'white' }}>{calculateReceivedAmount()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;