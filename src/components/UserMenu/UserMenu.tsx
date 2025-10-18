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
        <button aria-label='Abrir menu de usuário' className=' border-2 bg-[var(--user-menu-btn-bg-color)] hover:bg-[var()--user-menu-btn-bg-hover] focus:bg-[var()--user-menu-btn-bg-hover] active:bg-[var(--user-menu-btn-bg-active)] border-[var(--user-menu-btn-border-color)] hover:border-[var(--user-menu-btn-border-hover)] focus:border-[var(--user-menu-btn-border-hover)] active:border-[var(--user-menu-btn-border-active)] shadow-[var(--user-menu-btn-shadow)] hover:shadow-[var(--user-menu-btn-shadow-hover)] focus:shadow-[var(--user-menu-btn-shadow-hover)] active:shadow-[var(--user-menu-btn-shadow-active)] text-[var(--user-menu-btn-text-color)] hover:text-[var(--user-menu-btn-text-hover)] focus:text-[var(--user-menu-btn-text-hover)] active:text-[](var(--user-menu-btn-text-active)] p-2 rounded cursor-pointer'>
          <User size={"32"}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='rounded-2xl bg-[var(--user-menu-bg-color)] shadow-[var(--user-menu-shadow)] border-4 border-[var(--user-menu-border-color)]' align="end">
        <DropdownMenuItem className='p-8 cursor-pointer border mt-4 bg-[var(--user-menu-btn-bg-color)] hover:bg-[var()--user-menu-btn-bg-hover] focus:bg-[var()--user-menu-btn-bg-hover] active:bg-[var(--user-menu-btn-bg-active)] border-[var(--user-menu-btn-border-color)] hover:border-[var(--user-menu-btn-border-hover)] active:border-[var(--user-menu-btn-border-active)] shadow-[var(--user-menu-btn-shadow)] hover:shadow-[var(--user-menu-btn-shadow-hover)] active:shadow-[var(--user-menu-btn-shadow-active)] text-[var(--user-menu-btn-text-color)] hover:text-[var(--user-menu-btn-text-hover)] focus:text-[var(--user-menu-btn-text-hover)] active:text-[(var(--user-menu-btn-text-active)]'  onSelect={() => navigate('/dashboard')}>
          <LayoutDashboard className="mr-2" size={24}/>  
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-8 cursor-pointer border mt-4 bg-[var(--user-menu-btn-bg-color)] hover:bg-[var()--user-menu-btn-bg-hover] focus:bg-[var()--user-menu-btn-bg-hover] active:bg-[var(--user-menu-btn-bg-active)] border-[var(--user-menu-btn-border-color)] hover:border-[var(--user-menu-btn-border-hover)] active:border-[var(--user-menu-btn-border-active)] shadow-[var(--user-menu-btn-shadow)] hover:shadow-[var(--user-menu-btn-shadow-hover)] active:shadow-[var(--user-menu-btn-shadow-active)] text-[var(--user-menu-btn-text-color)] hover:text-[var(--user-menu-btn-text-hover)] focus:text-[var(--user-menu-btn-text-hover)] active:text-[(var(--user-menu-btn-text-active)]' onSelect={() => navigate('/settings')}>
          <Settings className="mr-2" size={24} />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='p-8 cursor-pointer border mt-4 bg-[var(--user-menu-btn-bg-color)] hover:bg-[var()--user-menu-btn-bg-hover] focus:bg-[var()--user-menu-btn-bg-hover] active:bg-[var(--user-menu-btn-bg-active)] border-[var(--user-menu-btn-border-color)] hover:border-[var(--user-menu-btn-border-hover)] active:border-[var(--user-menu-btn-border-active)] shadow-[var(--user-menu-btn-shadow)] hover:shadow-[var(--user-menu-btn-shadow-hover)] active:shadow-[var(--user-menu-btn-shadow-active)] text-[var(--user-menu-btn-text-color)] hover:text-[var(--user-menu-btn-text-hover)] focus:text-[var(--user-menu-btn-text-hover)] active:text-[(var(--user-menu-btn-text-active)]' onSelect={handleLogout}>
          <LogOut className="mr-2" size={24} />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
