import ChatBox from '@/components/Chatbox';
import './global.css';  // Adjust the path if your global.css is located elsewhere

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ChatBox />
    </>
  );
}

export default MyApp;
