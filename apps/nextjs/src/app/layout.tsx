import "~/styles/globals.css"

import { Inter } from "next/font/google"
import LocalFont from "next/font/local"
import { ClerkProvider } from "@clerk/nextjs"

import { cn } from "@linxia/utils"

import Provider from "~/providers/provider"
import { siteConfig } from "./config"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})
const fontCal = LocalFont({
  src: "../styles/calsans.ttf",
  variable: "--font-cal",
})

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "https://acme-corp-lib.vercel.app/opengraph-image.png" }],
    creator: "@jullerino",
  },
  metadataBase: new URL("https://acme-corp.jumr.dev"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={cn(
            "bg-gray-50 font-sans antialiased",
            fontSans.variable,
            fontCal.variable,
          )}
        >
          <div id="__next">
            <Provider>{children}</Provider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
