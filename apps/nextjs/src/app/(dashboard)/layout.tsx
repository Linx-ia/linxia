import type { ReactNode } from "react"
import { Suspense } from "react"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs"

import { Avatar, Button, LogoLinx } from "@linxia/ui"

import NavTabs from "~/components/nav-tabs"
import UserDropdown from "~/components/user-dropdown"

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await currentUser()

  if (!user) {
    return (
      <Link href="/signin">
        <Button type="ghost" className="relative h-8 w-8 rounded">
          <Avatar className="h-8 w-8" />
        </Button>
      </Link>
    )
  }

  const fullname = `${user.firstName} ${user.lastName}`

  const email = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId,
  )?.emailAddress

  return (
    <div className="h-full w-full">
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <LogoLinx className="h-8 w-8 transition-all duration-75 active:scale-95" />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://dub.co/changelog"
                rel="noreferrer"
                className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
                target="_blank"
              >
                Changelog
              </a>
              <a
                href="https://dub.co/help"
                rel="noreferrer"
                className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
                target="_blank"
              >
                Help
              </a>
              <UserDropdown
                user={{ name: fullname, email, image: user.imageUrl }}
              />
            </div>
          </div>
          <Suspense fallback={<div className="h-12 w-full" />}>
            <NavTabs />
          </Suspense>
        </div>
      </div>
      {children}
    </div>
  )
}
