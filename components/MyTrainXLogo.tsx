export function MyTrainXLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "mtxLogo mtxLogoCompact" : "mtxLogo"}>
      <span className="mtxLogoMark" aria-hidden="true">X</span>
      {!compact && (
        <span className="mtxLogoText">
          <b>MYTRAIN<span>X</span></b>
          <small>AI PERSONAL TRAINER</small>
        </span>
      )}
    </span>
  );
}
