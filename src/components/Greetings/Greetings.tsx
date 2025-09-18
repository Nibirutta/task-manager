import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import GradientText from '../../lib/Nurui/gradientText';
import { Button } from '../../lib/Reui/button/button';

function Greetings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <GradientText
        className="font-semibold text-[2rem] font-[--greetings-font]"
        colors={['#a8ff78', '#78ffd6', '#a8ff78']}
        animationSpeed={10}
      >
        Olá, {user}!
      </GradientText>
      <Button variant="outline" size="sm" onClick={handleLogout} className="p-0 h-auto text-muted-foreground hover:text-primary">
        Não é você? Sair
      </Button>
    </div>
  );
}

export default Greetings;
