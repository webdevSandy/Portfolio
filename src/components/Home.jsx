import insta from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import Typewriter from "typewriter-effect"
import HP from '../assets/main-photo.png'

function Home() {
  const info = {
    Name: "Sandy",
    stack: ['Frontend Developer', 'React Enthusiast', 'UI/UX Designer']
  };
  return (
    <div id='Home' className="flex flex-col lg:flex-row items-center justify-around  max-h-max lg:h-screen p-6 lg:p-0">
      
      <div className="text-center w-2/3 lg:ml-44 lg:text-left">
        <h1 className="font-bold text-5xl lg:text-7xl">
          Hi, <br /> I am {info.Name}
        </h1>
        <p className="font-bold text-5xl  text-red-700">
        <Typewriter options={{ strings: (info.stack), autoStart: true, loop: true, }} />
        </p>
        <div className="flex gap-10 lg:gap-20 mt-10 lg:mt-20 justify-center lg:justify-start">
          <a href="https://www.instagram.com/sandy_chaudhary_._/" target="_blank" rel="noopener noreferrer">
            <img src={insta} alt="instagram" className="h-8 lg:h-10" />
          </a>
          <a href="https://www.linkedin.com/in/webdevsandy/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="linkedin" className="h-8 lg:h-10" />
          </a>
          <a href="https://github.com/WevdevSandy/sandy-chaudhary" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="Github" className="h-8 lg:h-10" />
          </a>
          <a href="https://x.com/WebDev_Sandy_" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="twitter" className="h-8 lg:h-10" />
          </a>
        </div>
      </div>
      <img
        src={HP}
        alt="digital nomad"
        className="h-64 lg:h-96 lg:mr-40 mt-10 lg:mt-0"
      />
    </div>
  );
}

export default Home;
