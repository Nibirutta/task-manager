import useAuth from '../../hooks/useAuth';
import Navbar from '../../features/Navbar/Navbar';
import Greetings from '../../components/Greetings/Greetings';
import style from './Header.module.css'

function Header() {

  const { isAuthenticated } = useAuth();

  return (
    <header className={style.header}>
      <div className={style.content}>
        <Navbar />
        {isAuthenticated && <Greetings />}
      </div>
    </header>
  );
}

export default Header;