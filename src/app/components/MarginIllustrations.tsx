type IllustrationKind =
  | "coxinha"
  | "brigadeiro"
  | "empada"
  | "bolo"
  | "torta30"
  | "trufa"
  | "fatia"
  | "pastel"
  | "barquete"
  | "fouet"
  | "morango"
  | "trouxinha";

function CulinarySvg({ kind, size }: { kind: IllustrationKind; size: number }) {
  switch (kind) {
    case "coxinha":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M32 8C23 18 14 28 14 40a18 18 0 0036 0c0-12-9-22-18-32z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 42c2 5 7 8 12 8" strokeLinecap="round" />
          <circle cx="28" cy="30" r="1.5" fill="currentColor" />
          <circle cx="36" cy="34" r="1.5" fill="currentColor" />
          <circle cx="32" cy="24" r="1.5" fill="currentColor" />
        </svg>
      );
    case "brigadeiro":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 36l6 18h24l6-18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 36c3-3 6-3 9 0 3-3 6-3 9 0 3-3 6-3 9 0 3-3 6-3 9 0 2-2 4-2 4 0" strokeLinecap="round" />
          <path d="M16 34c0-10 7-17 16-17s16 7 16 17" strokeLinecap="round" />
          <path d="M25 24l3 2M34 22l2 3M28 29l3 1M37 28l2 2" strokeLinecap="round" />
          <circle cx="32" cy="14" r="3" />
        </svg>
      );
    case "empada":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10 34h44l-5 16H15l-5-16z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 34c0-8 9-14 20-14s20 6 20 14" strokeLinecap="round" />
          <path d="M10 34c3 3 7 3 11 0 3 3 7 3 11 0 3 3 7 3 11 0 3 3 7 3 11 0" strokeLinecap="round" />
          <path d="M26 26l12 4M38 26l-12 4" strokeLinecap="round" />
        </svg>
      );
    case "bolo":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="12" y="34" width="40" height="18" rx="3" />
          <path d="M18 34V24a3 3 0 013-3h22a3 3 0 013 3v10" />
          <path d="M12 40c4 3 8 3 13 0 4 3 9 3 14 0 4 3 9 3 13 0" strokeLinecap="round" />
          <path d="M18 27c3 2 6 2 9 0 3 2 6 2 9 0 3 2 6 2 8 0" strokeLinecap="round" />
          <circle cx="24" cy="19" r="2" />
          <circle cx="32" cy="18" r="2.5" />
          <circle cx="40" cy="19" r="2" />
          <path d="M8 52h48" strokeLinecap="round" />
        </svg>
      );
    case "torta30":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="32" cy="28" rx="22" ry="10" />
          <path d="M10 28v10c0 5.5 9.8 10 22 10s22-4.5 22-10V28" />
          <path d="M18 24l28 8M46 24l-28 8M24 21l16 14M40 21L24 35" strokeLinecap="round" />
        </svg>
      );
    case "trufa":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 38c0-9 7-16 16-16s16 7 16 16H16z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 38h40l-4 10H16l-4-10z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 28c3-2 7-2 10 1 3-3 7-3 10-1" strokeLinecap="round" />
        </svg>
      );
    case "fatia":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 36L46 18c6 4 8 10 8 18H12z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 36v14h42V36" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 43h42" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="38" cy="20" r="3.5" />
          <path d="M39 16c2-3 5-4 7-3" strokeLinecap="round" />
        </svg>
      );
    case "pastel":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 42c0-13 9-24 20-24s20 11 20 24H12z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 42h48" strokeLinecap="round" />
          <path d="M15 39v-3M20 33l-2-2M26 28l-1-3M32 26v-3M38 28l1-3M44 33l2-2M49 39v-3" strokeLinecap="round" />
        </svg>
      );
    case "barquete":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 32c6 12 15 16 24 16s18-4 24-16H8z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 32c4-6 10-9 18-9s14 3 18 9" strokeLinecap="round" />
          <path d="M24 28c2-2 5-2 8 0 3-2 6-2 8 0" strokeLinecap="round" />
        </svg>
      );
    case "fouet":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 50l16-16" strokeLinecap="round" strokeWidth="2.4" />
          <ellipse cx="40" cy="24" rx="9" ry="15" transform="rotate(45 40 24)" />
          <ellipse cx="40" cy="24" rx="4.5" ry="15" transform="rotate(45 40 24)" />
          <path d="M18 20v4M16 22h4M48 44v4M46 46h4" strokeLinecap="round" />
        </svg>
      );
    case "morango":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M32 52C20 44 16 32 20 23c3-6 9-6 12-3 3-3 9-3 12 3 4 9 0 21-12 29z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 17c3 2 6 3 8 3s5-1 8-3M32 13v7" strokeLinecap="round" />
          <path d="M19 32c4 3 8 3 13 0 4 3 9 3 13 0" strokeLinecap="round" />
        </svg>
      );
    case "trouxinha":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 30c-4 5-5 14 0 19 4 4 20 4 24 0 5-5 4-14 0-19" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 30c4 2 20 2 24 0" strokeLinecap="round" />
          <path d="M26 30l-4-12 7 4 3-5 3 5 7-4-4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

const leftMarginItems: Array<{
  top: string;
  left: string;
  size: number;
  rotate: number;
  kind: IllustrationKind;
  color: string;
}> = [
  { top: "140px", left: "18px", size: 78, rotate: -16, kind: "coxinha", color: "text-brand-heading" },
  { top: "380px", left: "64px", size: 54, rotate: 18, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "640px", left: "12px", size: 68, rotate: -10, kind: "empada", color: "text-brand-gold" },
  { top: "900px", left: "56px", size: 84, rotate: 14, kind: "fatia", color: "text-brand-heading" },
  { top: "1180px", left: "16px", size: 58, rotate: -22, kind: "pastel", color: "text-brand-primary" },
  { top: "1440px", left: "68px", size: 72, rotate: 12, kind: "trufa", color: "text-brand-gold" },
  { top: "1720px", left: "14px", size: 90, rotate: -14, kind: "bolo", color: "text-brand-primary" },
  { top: "2000px", left: "60px", size: 52, rotate: 24, kind: "barquete", color: "text-brand-heading" },
  { top: "2280px", left: "20px", size: 74, rotate: -18, kind: "torta30", color: "text-brand-gold" },
  { top: "2560px", left: "58px", size: 62, rotate: 15, kind: "morango", color: "text-brand-primary" },
  { top: "2840px", left: "12px", size: 80, rotate: -12, kind: "trouxinha", color: "text-brand-heading" },
  { top: "3120px", left: "64px", size: 56, rotate: 20, kind: "fouet", color: "text-brand-gold" },
  { top: "3400px", left: "18px", size: 70, rotate: -20, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "3680px", left: "54px", size: 82, rotate: 10, kind: "coxinha", color: "text-brand-heading" },
  { top: "3960px", left: "14px", size: 60, rotate: -15, kind: "fatia", color: "text-brand-gold" },
  { top: "4240px", left: "62px", size: 74, rotate: 18, kind: "empada", color: "text-brand-primary" },
  { top: "4520px", left: "16px", size: 66, rotate: -12, kind: "pastel", color: "text-brand-heading" },
  { top: "4800px", left: "52px", size: 76, rotate: 14, kind: "bolo", color: "text-brand-gold" },
];

const rightMarginItems: Array<{
  top: string;
  right: string;
  size: number;
  rotate: number;
  kind: IllustrationKind;
  color: string;
}> = [
  { top: "180px", right: "20px", size: 82, rotate: 15, kind: "bolo", color: "text-brand-primary" },
  { top: "440px", right: "62px", size: 58, rotate: -18, kind: "pastel", color: "text-brand-heading" },
  { top: "700px", right: "14px", size: 72, rotate: 12, kind: "trufa", color: "text-brand-gold" },
  { top: "960px", right: "58px", size: 64, rotate: -14, kind: "coxinha", color: "text-brand-primary" },
  { top: "1240px", right: "16px", size: 86, rotate: 18, kind: "torta30", color: "text-brand-heading" },
  { top: "1520px", right: "64px", size: 54, rotate: -22, kind: "morango", color: "text-brand-gold" },
  { top: "1800px", right: "18px", size: 76, rotate: 10, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "2080px", right: "56px", size: 66, rotate: -16, kind: "empada", color: "text-brand-heading" },
  { top: "2360px", right: "12px", size: 80, rotate: 20, kind: "fatia", color: "text-brand-gold" },
  { top: "2640px", right: "60px", size: 56, rotate: -12, kind: "fouet", color: "text-brand-primary" },
  { top: "2920px", right: "16px", size: 74, rotate: 14, kind: "barquete", color: "text-brand-heading" },
  { top: "3200px", right: "58px", size: 68, rotate: -19, kind: "trouxinha", color: "text-brand-gold" },
  { top: "3480px", right: "14px", size: 84, rotate: 16, kind: "bolo", color: "text-brand-primary" },
  { top: "3760px", right: "62px", size: 58, rotate: -15, kind: "trufa", color: "text-brand-heading" },
  { top: "4040px", right: "18px", size: 72, rotate: 12, kind: "coxinha", color: "text-brand-gold" },
  { top: "4320px", right: "54px", size: 64, rotate: -20, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "4600px", right: "16px", size: 78, rotate: 15, kind: "torta30", color: "text-brand-heading" },
  { top: "4880px", right: "58px", size: 62, rotate: -14, kind: "morango", color: "text-brand-gold" },
];

export function MarginIllustrations() {
  return (
    <div
      aria-hidden="true"
      style={{ overflowAnchor: "none" }}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden xl:block"
    >
      {leftMarginItems.map((item, idx) => (
        <div
          key={`left-${idx}`}
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotate}deg)`,
          }}
          className={`absolute ${item.color} opacity-[0.13] dark:opacity-[0.17] transition-opacity`}
        >
          <CulinarySvg kind={item.kind} size={item.size} />
        </div>
      ))}

      {rightMarginItems.map((item, idx) => (
        <div
          key={`right-${idx}`}
          style={{
            top: item.top,
            right: item.right,
            transform: `rotate(${item.rotate}deg)`,
          }}
          className={`absolute ${item.color} opacity-[0.13] dark:opacity-[0.17] transition-opacity`}
        >
          <CulinarySvg kind={item.kind} size={item.size} />
        </div>
      ))}
    </div>
  );
}

