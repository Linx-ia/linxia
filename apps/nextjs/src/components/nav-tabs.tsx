"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function NavTabs() {
  const pathname = usePathname()
  const segments = pathname.split("/")
  const pathSegments = segments.length > 2 ? segments[2] : undefined
  const id = segments[segments.length - 1]

  const tabs = [
    { name: "Home", href: `/dashboard` },
    { name: "Analytics", href: `/dashboard/analytics` },
    { name: "Domains", href: `/dashboard/domains` },
    { name: "Settings", href: `/dashboard/settings` },
  ]

  const tabsAgents = [
    { name: "Home", href: `/dashboard` },
    { name: "Chat", href: `/dashboard/agent/${id}` },
    { name: "Deploy", href: `/dashboard/deploy/${id}` },
    { name: "Settings", href: `/dashboard/settings/${id}` },
  ]

  return (
    <div className="scrollbar-hide mb-[-3px] flex h-12 items-center justify-start space-x-2 overflow-x-auto">
      {!pathSegments
        ? tabs.map(({ name, href }) => (
            <Link key={href} href={href} className="relative">
              <div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                <p
                  className={`text-sm ${pathname === href ? "text-secondary" : "text-gray-600"} font-medium hover:text-black`}
                >
                  {name}
                </p>
              </div>
              {pathname === href && (
                <motion.div
                  layoutId="indicator"
                  transition={{
                    duration: 0.25,
                  }}
                  className="absolute bottom-0 w-full px-1.5"
                >
                  <div className="h-0.5 bg-secondary" />
                </motion.div>
              )}
            </Link>
          ))
        : tabsAgents.map(({ name, href }) => (
            <Link key={href} href={href} className="relative">
              <div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                <p
                  className={`text-sm ${pathname === href ? "text-secondary" : "text-gray-600"} font-medium hover:text-black`}
                >
                  {name}
                </p>
              </div>
              {pathname === href && (
                <motion.div
                  layoutId="indicator"
                  transition={{
                    duration: 0.25,
                  }}
                  className="absolute bottom-0 w-full px-1.5"
                >
                  <div className="h-0.5 bg-secondary" />
                </motion.div>
              )}
            </Link>
          ))}
    </div>
  )
}
