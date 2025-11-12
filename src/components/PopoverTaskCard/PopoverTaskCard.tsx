import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../lib/Reui/popover/popover';

interface PopoverTaskCardProps {
  children: React.ReactNode; // O elemento que vai disparar o popover (o botão)
  text: string; // O texto a ser exibido dentro do popover
}

/**
 * Um componente wrapper que adiciona um popover informativo (tooltip)
 * a qualquer elemento filho, ativado por hover ou focus.
 */
function PopoverTaskCard({ children, text }: PopoverTaskCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={8}
        className="w-auto bg-zinc-900 text-white text-sm px-3 py-1.5 border-zinc-700"
      >
        <p>{text}</p>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverTaskCard;