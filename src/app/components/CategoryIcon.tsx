export function CategoryIcon({
  category,
  className = "w-5 h-5",
}: {
  category: string;
  className?: string;
}) {
  switch (category) {
    case "Salgados Fritos":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-3.5 4-7 7.5-7 12a7 7 0 0014 0c0-4.5-3.5-8-7-12z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 15.5a3.5 3.5 0 005 0" />
        </svg>
      );
    case "Salgados de Forno":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15h18l-2 5H5l-2-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15c0-4.5 3.1-8 7-8s7 3.5 7 8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v3M8 5.5l1 2M16 5.5l-1 2" />
        </svg>
      );
    case "Doces":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 14l2 6h10l2-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c0-2.5 2-4.5 4.5-4.5.4 0 .8.05 1.2.15A4.5 4.5 0 0114.2 9.65c.4-.1.8-.15 1.3-.15 2.5 0 4.5 2 4.5 4.5H4z" />
          <circle cx="12" cy="5.5" r="1.8" />
        </svg>
      );
    case "Tortas Doces":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 15v-4a2 2 0 012-2h8a2 2 0 012 2v4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 15c1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 6 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v3M12 4a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
      );
    case "Tortas Salgadas":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <ellipse cx="12" cy="10" rx="9" ry="4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10v5c0 2.5 4 4.5 9 4.5s9-2 9-4.5v-5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.5l9 3M16.5 8.5l-9 3" />
        </svg>
      );
    case "Vinagretes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 11h16a8 8 0 01-16 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8M12 19v1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
  }
}

