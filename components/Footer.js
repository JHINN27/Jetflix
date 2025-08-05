'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Supported Devices', href: '/devices' },
      { name: 'Accessibility', href: '/accessibility' }
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Preferences', href: '/cookies' },
      { name: 'Corporate Information', href: '/corporate' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' }
  ]

  return (
    <footer className="bg-black text-gray-400 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex space-x-6 mb-8">
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
              <Link
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent size={24} />
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h3 className="text-white font-semibold mb-4">Jetflix</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your ultimate destination for movies and TV shows. Stream unlimited entertainment.
            </p>
            <div className="text-sm text-gray-500">
              <p>Service Code: 1-844-505-2993</p>
              <p className="mt-2">© 2024 Jetflix, Inc.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* <div className="text-sm text-gray-500 mb-4 md:mb-0">
              Made with ❤️ for learning Next.js 15
            </div> */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms
              </Link>
              <span className="text-gray-500">Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}