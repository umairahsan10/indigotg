import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-white" style={{ backgroundColor: '#140079' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          {/* Left: Logo + Contacts + Socials */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4">
              {/* Update the src to your actual logo filename in /public */}
              <Image src="/logo-white.png" alt="Indigo" width={240} height={60} className="w-auto h-14 md:h-16" />
            </div>

            <div className="mt-6 space-y-2 text-sm/6 opacity-90">
              <p><span className="font-semibold">United Kingdom</span> +44 129 1435500</p>
              <p><span className="font-semibold">Ireland</span> +353 61 306 688</p>
              <p><span className="font-semibold">USA</span> +1 719-408-8847</p>
              <p><span className="font-semibold">Asia Pacific</span> +852 9151 9885</p>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4">
              <Link href="#" aria-label="LinkedIn" className="hover:opacity-90 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6C1.12 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.88 1 4.98 2.12 4.98 3.5ZM0 8H5V24H0V8ZM7.98 8H12.76V10.16H12.84C13.52 8.86 15.16 7.5 17.64 7.5C22.44 7.5 24 10.66 24 15.06V24H19V15.98C19 13.86 18.96 11.2 16.12 11.2C13.24 11.2 12.82 13.46 12.82 15.82V24H7.98V8Z" fill="white"/>
                </svg>
              </Link>
              <Link href="#" aria-label="X" className="hover:opacity-90 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2H21.5L14.5 10.01L22.75 22H16.5L11.5 14.99L5.75 22H2.5L9.75 13.49L1.75 2H8.25L12.75 8.51L18.244 2ZM17.125 20H18.875L7.875 4H6.125L17.125 20Z" fill="white"/>
                </svg>
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:opacity-90 transition-opacity">
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.2 3.5a4 4 0 00-2.8-2.8C20.2 0 13 0 13 0S5.8 0 3.6.7A4 4 0 00.8 3.5C0 5.7 0 9 0 9s0 3.3.8 5.5a4 4 0 002.8 2.8C5.8 18 13 18 13 18s7.2 0 9.4-.7a4 4 0 002.8-2.8C26 12.3 26 9 26 9s0-3.3-.8-5.5zM10 13V5l7 4-7 4z" fill="white"/>
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:opacity-90 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1111.5 18 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM18 6.2a1 1 0 110-2 1 1 0 010 2z" fill="white"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right link columns */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <p className="mb-3 font-semibold">Who we are</p>
              <ul className="space-y-2 text-base/7 md:text-lg/7 opacity-90">
                <li><Link href="/who-we-are" className="hover:underline">Leadership Team</Link></li>
                <li><Link href="/who-we-are" className="hover:underline">Vision & Values</Link></li>
                <li><Link href="/who-we-are" className="hover:underline">SHEQ</Link></li>
                <li><Link href="/responsibilities" className="hover:underline">Responsibilities</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold">Our Services</p>
              <ul className="space-y-2 text-base/7 md:text-lg/7 opacity-90">
                <li><Link href="/our-services" className="hover:underline">Design</Link></li>
                <li><Link href="/our-services" className="hover:underline">Deploy</Link></li>
                <li><Link href="/our-services" className="hover:underline">Support</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold">Solutions</p>
              <ul className="space-y-2 text-base/7 md:text-lg/7 opacity-90">
                <li><Link href="/solutions" className="hover:underline">Data Centres</Link></li>
                <li><Link href="/solutions" className="hover:underline">Fixed Line</Link></li>
                <li><Link href="/solutions" className="hover:underline">Network</Link></li>
                <li><Link href="/solutions" className="hover:underline">Services</Link></li>
                <li><Link href="/solutions" className="hover:underline">Wireless/5G</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold">Success Stories</p>
              <ul className="space-y-2 text-base/7 md:text-lg/7 opacity-90">
                <li><Link href="/news" className="hover:underline">News</Link></li>
                <li><Link href="/our-services" className="hover:underline">Customer</Link></li>
                <li><Link href="/our-services" className="hover:underline">Support</Link></li>
                <li><Link href="/partner-portal" className="hover:underline">Partner Portal</Link></li>
                <li><Link href="/resources" className="hover:underline">Resources</Link></li>
                <li><Link href="/get-in-touch" className="hover:underline">Get In Touch</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm opacity-90">
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:underline">Terms & Conditions</Link>
            <span className="hidden md:inline">|</span>
            <Link href="#" className="hover:underline">Privacy policy</Link>
          </div>
          <p>© {year} Made by Bytes Platform</p>
        </div>
      </div>
    </footer>
  );
}


