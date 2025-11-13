import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import style from "./layout.module.css";
import Header from "./Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  // Efeito para sincronizar a cor do tema do navegador mobile com o tema da aplicação.
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      // Se a tag não existir por algum motivo, não faz nada.
      return;
    }

    // Função para ler a variável CSS e atualizar a meta tag.
    const updateThemeColor = () => {
      // Usamos getComputedStyle para obter o valor real da variável do tema ativo.
      const headerBgColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-bg-color')
        .trim();

      if (headerBgColor) {
        metaThemeColor.setAttribute('content', headerBgColor);
      }
    };

    // Atualiza a cor na primeira renderização.
    updateThemeColor();

    // Observa mudanças no atributo 'data-theme' do body.
    const observer = new MutationObserver(() => updateThemeColor());
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    // Limpa o observer quando o componente é desmontado.
    return () => observer.disconnect();
  }, []); // O array vazio garante que este efeito rode apenas uma vez (setup e cleanup).

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
