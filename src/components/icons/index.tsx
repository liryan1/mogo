import { FaFacebook, FaGithub, FaPaypal, FaTwitter, FaYoutube } from 'react-icons/fa'
import { BiLogoLinkedinSquare } from 'react-icons/bi'
import { MdMail } from 'react-icons/md'
import Link from 'next/link'

const components = {
  mail: MdMail,
  github: FaGithub,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedin: BiLogoLinkedinSquare,
  twitter: FaTwitter,
  paypal: FaPaypal
} as const

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

export default function SocialIcon({ kind, href, size = 8 }: SocialIconProps) {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const Icon = components[kind]

  return (
    <Link
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <Icon
        className={`fill-current text-gray-700 hover:text-purple-400 dark:text-gray-200 dark:hover:text-purple-400 h-${size} w-${size}`}
      />
    </Link>
  )
}
