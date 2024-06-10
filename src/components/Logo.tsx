import Image from "next/image";

interface LogoProps {
  h?: number;
}

interface LogoWithTextProps extends LogoProps {
  text: string;
}

export function LogoWithText({ h, text }: LogoWithTextProps) {
  return (
    <div className="flex items-center gap-2 text-3xl">
      <Logo h={h} />
      {text}
    </div>
  );
}

export function Logo({ h }: LogoProps) {
  return (
    <Image
      className="p-0 m-0"
      src="/logo.svg"
      height={h ?? "40"}
      width={h ?? "40"}
      alt="M"
      priority
    />
  );
}
