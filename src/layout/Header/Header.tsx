import Navbar from '../../components/Navbar/Navbar';


// import ThemeSwitcher from './ThemeSwitcher'; // E este também

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Navbar />
      </div>
    </header>
  );
}

export default Header;