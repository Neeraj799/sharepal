import { ChevronUp, Headset } from 'lucide-react'
import FooterCategories from './FooterCategories'
import FooterSeoContent from './FooterSeoContent'
import { helpLinks, linkColumns } from '../data/footer'
import logoShare from '../assets/images/footer-logo-share.svg'
import logoPal from '../assets/images/footer-logo-pal.svg'
import mailIcon from '../assets/images/icon-mail.svg'
import facebookIcon from '../assets/images/social-facebook.svg'
import instagramIcon from '../assets/images/social-instagram.svg'
import linkedinIcon from '../assets/images/social-linkedin.svg'

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/Sharepal.in', icon: facebookIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/sharepal.in/', icon: instagramIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/sharepal/', icon: linkedinIcon },
]

const COLUMN_TITLE = 'mb-3 text-sm font-bold leading-[18px] text-white md:mb-6'
const LINK_TEXT = 'text-xs font-medium md:text-sm md:leading-[18px]'
const HELP_LINK =
  'flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3'

const Footer = () => {
  return (
    // pb-16 keeps the last row clear of the fixed mobile tab bar
    <footer className="bg-primary-900 pb-16 pt-5 md:pb-10 md:pt-[72px]">
      <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-5 px-4 md:gap-12">
        <FooterCategories />
        <FooterSeoContent />

        <div className="flex flex-col gap-8">
          <div className="flex h-10 items-center bg-linear-to-r from-primary-900 to-[#03134f]">
            <img src={logoShare} alt="SharePal" className="w-24" />
            <img src={logoPal} alt="" />
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:gap-3 lg:grid-cols-5">
            {linkColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className={COLUMN_TITLE}>{column.title}</h2>
                <div className="flex flex-col gap-1 text-neutral-300">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`whitespace-nowrap py-1.5 decoration-transparent transition-all duration-300 hover:text-primary-100 hover:underline hover:decoration-white md:py-3 ${LINK_TEXT}`}
                    >
                      {link.label}
                      {link.isNew && (
                        <span className="ml-1 inline-flex -translate-y-2 items-center rounded-full bg-secondary-500 px-2.5 py-[0.5px] text-[10px] font-bold leading-4 text-secondary-900 md:leading-[18px]">
                          New
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </nav>
            ))}

            <div>
              <h2 className={COLUMN_TITLE}>Need Help</h2>
              <div className={`flex flex-col gap-2 text-neutral-300 ${LINK_TEXT}`}>
                <a href={helpLinks.support} className={HELP_LINK}>
                  <Headset aria-hidden="true" className="size-4 shrink-0" />
                  Contact Support
                </a>
                <a href={helpLinks.contact} className={HELP_LINK}>
                  Contact Us
                </a>
                <a href={`mailto:${helpLinks.email}`} className={HELP_LINK}>
                  <img src={mailIcon} alt="" />
                  {helpLinks.email}
                </a>
                <div className="flex items-center gap-3 py-1.5 md:py-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-opacity duration-300 hover:opacity-80"
                    >
                      <img src={social.icon} alt={`SharePal on ${social.name}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-primary-700 py-6 text-sm font-medium text-primary-300 max-md:flex-col">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 max-md:w-full max-md:justify-center max-md:rounded-xs max-md:bg-primary-850 max-md:py-2"
            >
              Go up
              <ChevronUp aria-hidden="true" className="size-6" />
            </button>
            <p>© {new Date().getFullYear()}. SWNAC E-Kiraya Services Pvt Ltd</p>
            <p>Made with ♥️ for India</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
