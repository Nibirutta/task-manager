import { styled } from '@mui/material/styles';
import Switch, { type SwitchProps } from '@mui/material/Switch';

/**
 * Um componente Switch estilizado que utiliza variáveis CSS para se adaptar ao tema da aplicação.
 * As cores do "thumb" (a bolinha) e do "track" (o trilho) são definidas por variáveis
 * para o estado normal e checado (ligado).
 */
const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    // Estilos para o estado LIGADO (checked)
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff', // Cor base do ícone interno, se houver.
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--switch-track-checked-color, #65C466)', // Cor do trilho quando ligado
        opacity: 1,
        border: 0,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: 'var(--switch-thumb-checked-color, #fff)', // Cor do thumb quando ligado
      },
    },
  },
  // Estilos para o THUMB (a bolinha)
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    backgroundColor: 'var(--switch-thumb-color, #aaa)', // Cor do thumb quando desligado
  },
  // Estilos para o TRACK (o trilho)
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: 'var(--switch-track-color, #E9E9EA)', // Cor do trilho quando desligado
    opacity: 1,
  },
}));

export default StyledSwitch;