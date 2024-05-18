import Link from "next/link";

// Components
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            hbsoft<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* desktop nav */}
        <div className="hidden">
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
