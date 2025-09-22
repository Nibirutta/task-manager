import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import cn from "../../lib/utils";
import { Button } from "../../lib/Reui/button/button";
import UserMenu from "../../components/UserMenu/UserMenu";

const navLinkClasses =
  "text-3xl font-medium text-[var(--navbar-link-color)] font-[var(--navbar-link-font)] transition-colors hover:text-[var(--navbar-link-hover)]";
const activeNavLinkClasses = "text-[var(--navbar-link-hover)] font-semibold";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const commonLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(navLinkClasses, isActive && activeNavLinkClasses)
        }
      >
        Home
      </NavLink>
    </>
  );

  const authLinks = (
    <>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          cn(navLinkClasses, isActive && activeNavLinkClasses)
        }
      >
        Dashboard
      </NavLink>
    </>
  );

  const publicLinks = (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          cn(navLinkClasses, isActive && activeNavLinkClasses)
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          cn(navLinkClasses, isActive && activeNavLinkClasses)
        }
      >
        Registrar
      </NavLink>
    </>
  );

  const handleMobileLinkClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 p-4 rounded-md font-bold shrink-0 text-[var(--navbar-logo-color)]"
          style={{ fontFamily: "var(--navbar-logo-font)" }}
        >
          {/* <img src="/logo.svg" alt="Task Manager Logo" className="h-6 w-6" /> */}
          <span className="inline-block text-4xl font-bold ">Task Manager</span>
        </Link>
      </div>

      {/* Ações da Direita: UserMenu (logado) ou Links/Botão Hambúrguer (deslogado) */}
      <div className="flex items-center  p-4 gap-16">
        {isAuthenticated ? (
          <div className="hidden md:flex items-center gap-4">
            {commonLinks}
            {isAuthenticated && authLinks}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">{publicLinks}</div>
        )}
      </div>

      {isAuthenticated ? (
        <div className="flex justify-between items-center px-12 py-4 gap-4">
          <UserMenu />

          <Button
            className="md:hidden"
            variant="ghost"
            size="lg"
            onClick={handleMobileLinkClick}
            aria-label="Abrir menu"
            type="button"
          >
            {isMenuOpen ? (
              <X className="h-10 w-10" />
            ) : (
              <Menu className="h-16 w-16" />
            )}
          </Button>
        </div>
      ) : null}

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
