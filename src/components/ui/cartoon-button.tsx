import { cn } from "@/lib/utils";
interface CartoonButtonProps {
  label: string;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function CartoonButton({
  label,
  color = 'bg-accent/30',
  hasHighlight = true,
  disabled = false,
  onClick,
  href,
  size = 'md',
  className
}: CartoonButtonProps) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };
  const sizeClasses = {
    sm: 'h-8 px-3 text-[10px] sm:h-8 sm:px-3 sm:text-xs',
    md: 'h-9 px-4 text-xs sm:h-9 sm:px-4 sm:text-xs',
    lg: 'h-11 px-5 text-sm sm:h-10 sm:px-4 sm:text-xs'
  };
  const buttonClasses = cn("relative rounded-full font-medium text-foreground border border-primary/40 transition-all duration-200 overflow-hidden group", sizeClasses[size], color, "animate-pulse-glow", "hover:shadow-[0_3px_0_0_hsl(var(--primary)/0.5),0_0_35px_hsl(var(--primary)/0.5)]", disabled ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-1 hover:brightness-110 active:translate-y-0.5 active:shadow-[0_1px_0_0_hsl(var(--primary)/0.3)]', className);
  const content = <>
      <span className="relative z-8 whitespace-wrap text-center text-xs">{label}</span>
      {hasHighlight && !disabled && <div className="absolute top-1/2 left-[-100%] w-12 h-16 bg-white/30 -translate-y-1/2 rotate-12 transition-all duration-500 ease-in-out group-hover:left-[200%]" />}
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/15 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Inner glow ring */}
      <div className="absolute inset-0 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </>;
  if (href) {
    return <a href={href} className={`inline-flex items-center justify-center ${buttonClasses}`}>
        {content}
      </a>;
  }
  return <button disabled={disabled} onClick={handleClick} className={buttonClasses}>
      {content}
    </button>;
}
export default CartoonButton;