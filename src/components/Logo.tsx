import Image from "next/image";

interface LogoProps {
  h?: number;
  w?: number
}

interface LogoWithTextProps extends LogoProps {
  text: string;
}

export function LogoWithText({ h, w, text }: LogoWithTextProps) {
  return (
    <div className="flex items-center gap-2 text-3xl">
      <Logo h={h} w={w} />
      {text}
    </div>
  );
}

export function Logo({ h, w }: LogoProps) {
  return (
    <Image
      className="p-0 m-0"
      src="/logo.svg"
      height={h ?? "40"}
      width={w ?? "120"}
      alt="M"
      priority
    />
  );
}
