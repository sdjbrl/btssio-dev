interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BentoGrid({ children, className = "" }: Props) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      role="region"
      aria-label="Modules de révision"
    >
      {children}
    </div>
  );
}
