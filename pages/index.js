import ThreeScene from "../components/img";
import Image from 'next/image';
import logo from "../public/logo.png";
import '../styles/global.css';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 bg-black">
      <header className="w-full flex justify-between items-center mb-4"> {/* Reduced bottom margin */}
      <div className="logo ml-20">
        <Image 
          src="/logo.png"  // Update with the correct path to your image
          alt="Logo"
          width={100}  // Adjust the width as needed
          height={100}  // Adjust the height as needed
        />
      </div>
        <nav className="flex items-center space-x-6"> {/* Reduced spacing between nav items */}
          <a href="#" className="text-white">Projects</a>
          <a href="#" className="text-white">Blog</a>
          <a href="#" className="text-white relative">Career</a>
          <a href="#" className="text-white">About Us</a>
          <a href="#" className="text-white">Contacts</a>
          <div className="flex space-x-2">
            <a href="#" className="text-white">UA</a>
            <a href="#" className="text-green-500">EN</a>
          </div>
        </nav>
      </header>

      <div className="relative flex justify-between items-center w-full flex-wrap lg:flex-nowrap">
        <div className="hero-text text-white w-lg z-10 mb-8 lg:mb-0">
          <h1 className="text-6xl font-bold  ml-20 mb-2"> {/* Increased font size and reduced bottom margin */}
            eCommerce Development 
          </h1>
          <p className="text-2xl ml-20 mb-6"> {/* Increased font size and reduced bottom margin */}
            Empowering eCommerce businesses for 15 years
          </p>
          <a href="#" className="cta-button text-white px-8 py-4 rounded-full inline-flex items-center text-xl bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] ml-20">
            Get a project price <span className="ml-2">&#8594;</span>
          </a>
        </div>
        <div className="hero-image w-full lg:w-1/2 h-auto flex justify-center lg:justify-end">
          <div className="w-[665px] h-[625px]">
            <ThreeScene />
          </div>
        </div>
      </div>

    </main>
  );
}
