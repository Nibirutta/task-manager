import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import cn from "../../lib/utils";

import UserMenu from "../../components/UserMenu/UserMenu";
import MobileNav from "../../components/MobileNav/MobileNav";

const navLinkClasses =
  "text-3xl font-medium text-[var(--navbar-link-color)] font-[var(--navbar-link-font)] transition-colors hover:text-[var(--navbar-link-hover)] focus:text-[var(--navbar-link-hover)]";
const activeNavLinkClasses = "text-[var(--navbar-link-hover)] font-semibold";

function Navbar() {
  const { isAuthenticated } = useAuth();

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

  return (
    <nav className="relative flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md font-bold shrink-0 text-[var(--navbar-logo-color)]"
          style={{ fontFamily: "var(--navbar-logo-font)" }}
        >
          {/* <img src="/logo.svg" alt="Task Manager Logo" className="h-6 w-6" /> */}
          <span className="inline-block text-6xl font-bold ">Task Manager</span>
        </Link>
      </div>

      {/* Links para Desktop */}
      <div className="hidden md:flex items-center gap-16">
        {isAuthenticated ? (
          <>
            {commonLinks}
            {authLinks}
          </>
        ) : (
          publicLinks
        )}
      </div>

      {/* Ações da Direita (Mobile e Desktop) */}
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <UserMenu />
          <MobileNav>
            {commonLinks}
            {authLinks}
          </MobileNav>
        </div>
      ) : (
        <MobileNav> {publicLinks} </MobileNav>
      )}
    </nav>
  );
}

export default Navbar;
