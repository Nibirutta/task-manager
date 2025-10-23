import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../lib/Reui/dropdown/dropdownMenu';

import useAuth from '../../hooks/useAuth';
import { User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label='Abrir menu de usuário' className='border-2 bg-[var(--user-menu-btn-bg-color)] hover:bg-[var(--user-menu-btn-bg-hover)] focus:bg-[var(--user-menu-btn-bg-hover)] active:bg-[var(--user-menu-btn-bg-active)] border-[var(--user-menu-btn-border-color)] hover:border-[var(--user-menu-btn-border-hover)] focus:border-[var(--user-menu-btn-border-hover)] active:border-[var(--user-menu-btn-border-active)] shadow-[var(--user-menu-btn-shadow)] hover:shadow-[var(--user-menu-btn-shadow-hover)] focus:shadow-[var(--user-menu-btn-shadow-hover)] active:shadow-[var(--user-menu-btn-shadow-active)] text-[var(--user-menu-btn-text-color)] hover:text-[var(--user-menu-btn-text-hover)] focus:text-[var(--user-menu-btn-text-hover)] active:text-[var(--user-menu-btn-text-active)] p-2 rounded cursor-pointer'>
          <User size={"32"}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='rounded-2xl bg-[var(--user-menu-container-bg-color)] shadow-[var(--user-menu-container-shadow)] border-4 border-[var(--user-menu-container-border-color)] w-72 p-4 space-y-2' align="end">
        <DropdownMenuItem className='p-4 cursor-pointer border text-2xl bg-[var(--user-menu-item--bg-color)] hover:bg-[var(--user-menu-item--bg-hover)] focus:bg-[var(--user-menu-item--bg-hover)] active:bg-[var(--user-menu-item--bg-active)] border-[var(--user-menu-item--border-color)] hover:border-[var(--user-menu-item--border-hover)] focus:border-[var(--user-menu-item--border-hover)] active:border-[var(--user-menu-item--border-active)] shadow-[var(--user-menu-item--shadow)] hover:shadow-[var(--user-menu-item--shadow-hover)] focus:shadow-[var(--user-menu-item--shadow-hover)] active:shadow-[var(--user-menu-item--shadow-active)] text-[var(--user-menu-item--text-color)] hover:text-[var(--user-menu-item--text-hover)] focus:text-[var(--user-menu-item--text-hover)] active:text-[var(--user-menu-item--text-active)] rounded-lg' onSelect={() => navigate('/dashboard')}>
          <LayoutDashboard className="mr-2" size={28}/>  
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-4 cursor-pointer border text-2xl bg-[var(--user-menu-item--bg-color)] hover:bg-[var(--user-menu-item--bg-hover)] focus:bg-[var(--user-menu-item--bg-hover)] active:bg-[var(--user-menu-item--bg-active)] border-[var(--user-menu-item--border-color)] hover:border-[var(--user-menu-item--border-hover)] focus:border-[var(--user-menu-item--border-hover)] active:border-[var(--user-menu-item--border-active)] shadow-[var(--user-menu-item--shadow)] hover:shadow-[var(--user-menu-item--shadow-hover)] focus:shadow-[var(--user-menu-item--shadow-hover)] active:shadow-[var(--user-menu-item--shadow-active)] text-[var(--user-menu-item--text-color)] hover:text-[var(--user-menu-item--text-hover)] focus:text-[var(--user-menu-item--text-hover)] active:text-[var(--user-menu-item--text-active)] rounded-lg' onSelect={() => navigate('/settings')}>
          <Settings className="mr-2" size={28} />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='p-4 cursor-pointer border text-2xl bg-[var(--user-menu-item--bg-color)] hover:bg-[var(--user-menu-item--bg-hover)] focus:bg-[var(--user-menu-item--bg-hover)] active:bg-[var(--user-menu-item--bg-active)] border-[var(--user-menu-item--border-color)] hover:border-[var(--user-menu-item--border-hover)] focus:border-[var(--user-menu-item--border-hover)] active:border-[var(--user-menu-item--border-active)] shadow-[var(--user-menu-item--shadow)] hover:shadow-[var(--user-menu-item--shadow-hover)] focus:shadow-[var(--user-menu-item--shadow-hover)] active:shadow-[var(--user-menu-item--shadow-active)] text-[var(--user-menu-item--text-color)] hover:text-[var(--user-menu-item--text-hover)] focus:text-[var(--user-menu-item--text-hover)] active:text-[var(--user-menu-item--text-active)] rounded-lg' onSelect={handleLogout}>
          <LogOut className="mr-2" size={28} />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
