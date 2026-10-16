import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Senior Front-End Engineer</span>
            <h1 className="h1 mb-6">
              {`Hello I'm`} <br />{" "}
              <span className="text-accent">Hossein Bajan</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I build scalable Vue.js and Nuxt.js applications. With 9+ years of experience,
              my work has spanned TypeScript architecture, offline-first PWAs,
              complex platforms, and engineering leadership.
            </p>
            {/* btn and social */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button asChild variant="outline" size="lg" className="uppercase flex items-center gap-2">
                <Link href="/resume/Hossein-Bajan-Resume.pdf" download aria-label="Download Hossein Bajan's CV as a PDF">
                  <span>Download CV</span>
                  <FiDownload className="text-xl" aria-hidden="true" />
                </Link>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
