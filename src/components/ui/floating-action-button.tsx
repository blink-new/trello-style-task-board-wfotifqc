import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
}

const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ className, size = 'default', variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'fixed rounded-full shadow-lg flex items-center justify-center transition-all',
          'hover:shadow-xl active:scale-95',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'bg-secondary text-secondary-foreground hover:bg-secondary/90': variant === 'secondary',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'bg-transparent hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'h-12 w-12 bottom-6 right-6': size === 'default',
            'h-10 w-10 bottom-5 right-5': size === 'sm',
            'h-14 w-14 bottom-8 right-8': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';

export { FloatingActionButton };