import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import style from './Layout.module.css';


// import Navbar from '../../features/Navbar/Navbar'; // Futuramente, você irá descomentar e usar isso

/**
 * O componente de Layout define a estrutura visual comum da aplicação.
 * Ele renderiza o Footer e um espaço reservado (<Outlet />) onde o 
 * conteúdo específico de cada página será injetado pelo React Router.
 */
const Layout = () => {
  return (
    <div className={style.layout}>
      {/* <Navbar /> */}
      <main>
        <Outlet /> {/* O conteúdo da rota filha será renderizado aqui */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

