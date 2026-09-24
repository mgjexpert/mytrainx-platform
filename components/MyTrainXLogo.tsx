import Image from "next/image";

export function MyTrainXLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "mtxLogo mtxLogoCompact" : "mtxLogo"}>
      <Image
        src={compact ? "/brand/x-icon-192.png" : "/brand/mytrainx-logo-orange.png"}
        alt={compact ? "MyTrainX — X" : "MyTrainX — Find your X"}
        width={compact ? 40 : 212}
        height={compact ? 40 : 50}
        sizes={compact ? "40px" : "(max-width: 600px) 150px, 212px"}
      />
    </span>
  );
}
