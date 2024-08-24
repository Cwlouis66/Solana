import React, { useState } from 'react';
import Popup from '../components/Popup';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      setResponse(data.response.replace(/\*\*/g, '').replace(/\n/g, '<br />'));

      setTimeout(() => {
        setIsPopupVisible(true);
      }, 5000);

    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    setResponse('The fund will be held until the rate increases.'); // Output message
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
    setResponse('The fund will be converted immediately.'); // Output message
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Crypto Swap Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., How can I swap ETH to SOL?"
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            {isLoading ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {response && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">AI Assistant:</h2>
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: response }}
          ></p>
        </div>
      )}
      {isPopupVisible && (
        <Popup
          message="Do you want to hold the funds until the rate increases?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
