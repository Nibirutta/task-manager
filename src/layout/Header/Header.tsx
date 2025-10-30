import useAuth from '../../hooks/useAuth';

import Greetings from '../../components/Greetings/Greetings';
import style from './Header.module.css'
import Navbar from '../../features/Navbar/Navbar';

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