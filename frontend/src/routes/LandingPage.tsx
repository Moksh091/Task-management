import { SiDropbox, SiSlack, SiSpotify, SiZoom } from "react-icons/si";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="p-6">
      <Navbar />
      <div className=" flex flex-col justify-center ">
        <div className=" text-center flex flex-col justify-center items-center">
          <h1 className="text-6xl font-semibold max-w-[720px] leading-20">
            Boost Productivity with the Best Platform
          </h1>
          <p className="text-gray-500 leading-16">
            Organize, Prioritize and Complete Your Tasks More Efficiently in One
            Trusted Platform
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <img
          src="/taskimg.webp"
          className="h-[700px] w-[1000px] object-center flex justify-center"
          alt=""
          loading="lazy"
          height={700}
          width={700}
        />
      </div>
      <div className="flex justify-center items-center mt-8 space-x-6 text-lg  font-semibold text-[#938def]">
        <div className="border border-gray-400 p-2 rounded-full flex items-center justify-center gap-1"><SiSpotify size={24} />Spotify</div>
        <div><SiZoom size={60} /></div>
        <div><SiSlack size={24} /></div>
        <div><SiDropbox size={24} /></div>
      </div>
      <div className=" flex flex-col justify-center mt-20 mb-8">
        <div className=" text-center flex flex-col justify-center items-center">
          <h1 className="text-6xl font-semibold max-w-[720px] leading-20">
            Optimize Time and Complete More Tasks
          </h1>
          <p className="text-gray-500 leading-16">
            Supercharge productivity. Streamline work by doing it, and seeing it, in one place.
          </p>
        </div>
        <section className="hero">
      <div className="hero-content">
        <h1>Join us! Be Part of the Smart Work Revolution</h1>
        <p>
          Join us and be part of the change in creating smarter, efficient,
          and productive working methods at every step!
        </p>
        <button>Book a Call</button>
      </div>
    </section>
      </div>
      <Footer/>
    </div>
  );
}

export default LandingPage;
