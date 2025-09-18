import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import cn from '../../lib/utils';
import { Button } from '../../lib/Reui/button/button';
import UserMenu from '../../components/UserMenu/UserMenu';

const navLinkClasses = "text-sm font-medium text-[var(--navbar-link-color)] font-[var(--navbar-link-font)] transition-colors hover:text-[var(--navbar-link-hover)]";
const activeNavLinkClasses = "text-[var(--navbar-link-hover)] font-semibold";

function Navbar() {

  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const commonLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses)}>Home</NavLink>
    </>
  );

  const authLinks = (
    <>
      <NavLink to="/dashboard" className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses)}>Dashboard</NavLink>
    </>
  );

  const publicLinks = (
    <>
      <NavLink to="/login" className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses)}>Login</NavLink>
      <NavLink to="/register" className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses)}>Registrar</NavLink>
    </>
  );


  const handleMobileLinkClick = () => setIsMenuOpen(!isMenuOpen)
  

  return (
    // `relative` é crucial para que o menu móvel (que é `absolute`) se posicione corretamente
    <nav className="relative flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold shrink-0 text-[var(--navbar-logo-color)]" style={{ fontFamily: 'var(--navbar-logo-font)' }}>
          {/* <img src="/logo.svg" alt="Task Manager Logo" className="h-6 w-6" /> */}
          <span className="hidden sm:inline-block">Task Manager</span>
        </Link>

        {/* Links de Navegação para Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {commonLinks}
          {isAuthenticated && authLinks}
        </div>
      </div>

      {/* Ações da Direita: UserMenu (logado) ou Links/Botão Hambúrguer (deslogado) */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          // Se estiver logado, mostre o UserMenu
          <UserMenu />
        ) : (
          // Se não estiver logado...
          <>
            {/* ...mostre os links públicos no desktop */}
            <div className="hidden md:flex items-center gap-4">
              {publicLinks}
            </div>
            {/* ...e o botão de menu no mobile */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick= {handleMobileLinkClick} aria-label="Abrir menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Painel do Menu Móvel (apenas para usuários não autenticados) */}
      {isMenuOpen && !isAuthenticated && (
        <div className="absolute top-full right-0 mt-2 w-full max-w-xs rounded-md border bg-background p-4 shadow-lg md:hidden">
          <div className="flex flex-col items-center gap-4" role="menu">
            {commonLinks}
            {publicLinks}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
