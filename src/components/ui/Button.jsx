const VARIANTS = {
  primary:
    "bg-brand-blue text-white shadow-glow hover:brightness-110 border border-transparent",
  success:
    "bg-success text-white shadow-[0_8px_22px_rgba(22,163,74,0.25)] hover:brightness-110 border border-transparent",
  outline:
    "bg-white text-ink border border-line hover:border-brand-blue/40 hover:text-brand-blue",
  ghost: "bg-transparent text-ink-muted hover:text-ink",
  purple:
    "bg-brand-purple text-white shadow-glow hover:brightness-110 border border-transparent",
};

const SIZES = {
  sm: "h-8 px-3 text-[12px]",
  md: "h-9 px-3.5 text-[12.5px]",
  lg: "h-10 px-4 text-[13px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={14} />}
      {children}
      {IconRight && <IconRight size={14} />}
    </button>
  );
}
