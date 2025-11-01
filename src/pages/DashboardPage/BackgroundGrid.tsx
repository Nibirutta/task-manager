import { memo } from 'react';
import FlickeringGrid from '../../lib/magicUI/grid';

/**
 * Este componente encapsula o FlickeringGrid e usa React.memo
 * para garantir que ele seja renderizado apenas uma vez.
 * Como ele não recebe nenhuma prop que muda, o React irá pular
 * todas as futuras re-renderizações após a montagem inicial.
 */
const BackgroundGrid = memo(function BackgroundGrid() {
  return (
    <FlickeringGrid
      className="absolute inset-0 -z-10 size-full"
      squareSize={4}
      gridGap={6}
      color="#14213d"
      maxOpacity={0.5}
      flickerChance={0.1}
    />
  );
});

export default BackgroundGrid;