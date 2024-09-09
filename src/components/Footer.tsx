import Link from "next/link";
import SocialIcon from "@/components/icons";
import { siteMetadata } from "@/lib/siteMetadata";

export const socialLinks = {
  twitter: "https://twitter.com/nyig_go",
  facebook: "https://www.facebook.com/mingnyig",
  youtube: "https://youtube.com/nyig_go",
  linkedin: "https://www.linkedin.com/company/nyig",
};

type Social = keyof typeof socialLinks;
const socials: Social[] = ["youtube", "linkedin", "facebook", "twitter"];

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="my-10 mt-20 sm:mt-32">
      <div className="flex flex-col items-center">
        <hr className="w-[100%]" />
        <div className="mt-1 mb-2 flex space-x-2 text-sm">
          <div>{siteMetadata.title}</div>
          <div>{` • `}</div>
          <div>{`© 2024 - ${date}`}</div>
          <div>{` • `}</div>
          <Link className="hover:underline" href={siteMetadata.siteUrl}>
            {siteMetadata.applicationName}
          </Link>
        </div>
        <div className="hidden sm:flex mb-3 space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={8} />
          {socials.map((social) => (
            <SocialIcon key={social} kind={social} href={socialLinks[social]} size={8} />
          ))}
        </div>
        <div className="flex sm:hidden mb-3 space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          {socials.map((social) => (
            <SocialIcon key={social} kind={social} href={socialLinks[social]} size={6} />
          ))}
        </div>
      </div>
    </footer>
  );
}
