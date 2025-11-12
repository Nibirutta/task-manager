import { Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../lib/Reui/dropdown/dropdownMenu';

interface MobileNavProps {
  children: ReactNode;
}

function MobileNav({ children }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Estilos reutilizados do UserMenu, com correções de sintaxe
  const buttonClasses =
    'border-2 bg-[var(--user-menu-btn-bg-color)] hover:bg-[var(--user-menu-btn-bg-hover)] focus:bg-[var(--user-menu-btn-bg-hover)] active:bg-[var(--user-menu-btn-bg-active)] border-[var(--user-menu-btn-border-color)] hover:border-[var(--user-menu-btn-border-hover)] focus:border-[var(--user-menu-btn-border-hover)] active:border-[var(--user-menu-btn-border-active)] shadow-[var(--user-menu-btn-shadow)] hover:shadow-[var(--user-menu-btn-shadow-hover)] focus:shadow-[var(--user-menu-btn-shadow-hover)] active:shadow-[var(--user-menu-btn-shadow-active)] text-[var(--user-menu-btn-text-color)] hover:text-[var(--user-menu-btn-text-hover)] focus:text-[var(--user-menu-btn-text-hover)] active:text-[var(--user-menu-btn-text-active)] p-2 rounded cursor-pointer';

  const contentClasses =
    'rounded-2xl bg-[var(--user-menu-container-bg-color)] shadow-[var(--user-menu-container-shadow)] border-4 border-[var(--user-menu-container-border-color)] w-56';

  return (
    <div className="md:hidden">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={buttonClasses}
            aria-label={isOpen ? 'Fechar Menu' : 'Abrir Menu'}
            type="button"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={contentClasses}
          align="end"
          // Ao selecionar um item, o menu deve fechar
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {/*
            Envolvemos os links em DropdownMenuItem para que o DropdownMenu
            possa controlar o fechamento e o foco corretamente.
          */}
          <DropdownMenuItem asChild onSelect={() => setIsOpen(false)}>
            <div className="flex flex-col items-stretch gap-4 p-4">{children}</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MobileNav;