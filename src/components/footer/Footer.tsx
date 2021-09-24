import { FooterRoutes } from "../../helpers/routes";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className="bg-white border-t" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3
                  className={
                    `${styles.label} ` +
                    "text-sm text-green font-semibold  tracking-wider uppercase"
                  }
                >
                  For Business
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {FooterRoutes.business.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <a className="text-base text-gray-400 hover:text-green">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3
                  className={
                    `${styles.label} ` +
                    "text-sm text-green font-semibold tracking-wider uppercase"
                  }
                >
                  Community
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {FooterRoutes.community.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <a className="text-base text-gray-400 hover:text-green">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3
                  className={
                    `${styles.label} ` +
                    "text-sm text-green font-semibold tracking-wider uppercase"
                  }
                >
                  Listings
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {FooterRoutes.listings.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <a className="text-base text-gray-400 hover:text-green">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3
                  className={
                    `${styles.label} ` +
                    "text-sm text-green font-semibold tracking-wider uppercase"
                  }
                >
                  CannaPages
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {FooterRoutes.cannapages.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <a className="text-base text-gray-400 hover:text-green">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3
              className={
                `${styles.label} ` +
                "text-sm text-green font-semibold tracking-wider uppercase"
              }
            >
              Newsletter
            </h3>
            <p className="mt-4 text-base text-gray-400">
              Get our latest Deals, Dispatches, CANNAcritiques and more deliverd
              right to your inbox.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border  rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green focus:border-green focus:placeholder-green-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full button--main text-white bg-green hover:bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-green-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t  pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {FooterRoutes.social.map((item) => (
              <Link href={item.href} key={item.label}>
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">{item.label}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2009-2021 CANNAPAGES.COM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
