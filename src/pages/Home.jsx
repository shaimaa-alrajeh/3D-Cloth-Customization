import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import Navbar from '../components/Navbar';
import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {/* Outer container with background image for the entire page */}
      {snap.intro && (
        <motion.div
          className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative z-20"
          style={{
            backgroundImage: "url('./b1813a7c-a5d2-4ba3-bf6b-175cf57da43c.jpg')", // Background image applied here
          }}
          {...slideAnimation('left')}
        >

      <Navbar/>
          {/* Overlay for dimming the background image */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* Content Section */}
          <motion.section className="relative z-10 w-full min-h-screen p-10 flex items-center justify-center bg-cover bg-center bg-no-repeat">
            <motion.div
              className="home-content relative z-10 flex flex-col justify-center items-center text-center px-10 lg:px-32 py-16 lg:py-32 max-w-none mx-auto"
              {...headContainerAnimation}
            >
              {/* Glassmorphism Background (frosted glass effect) */}
              <motion.div
                className="relative z-20 bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-lg max-w-none mx-auto"
                {...headTextAnimation}
              >
                {/* Heading */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-extrabold leading-tight drop-shadow-lg">
                  TRY <br className="xl:block hidden" /> THE MAGIC
                </h1>

                {/* Description */}
                <motion.div
                  {...headContentAnimation}
                  className="flex flex-col gap-6 mt-8 items-center"
                >
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl mx-auto font-normal">
                    Create your unique and exclusive shirt with our brand-new 3D customization
                    tool. <strong>Unleash your imagination</strong> and define your own style.
                  </p>

                  <CustomButton
                    type="filled"
                    title="Start Designing"
                    handleClick={() => (state.intro = false)}
                    customStyles="w-fit px-8 py-3 text-lg font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity mt-6"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home;
