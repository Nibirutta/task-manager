import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import style from "./Layout.module.css";
import Header from "./Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        closeButton={true}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        rtl={false}
        pauseOnFocusLoss= {false}
        draggable={true}
        theme={"light"}
      />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
