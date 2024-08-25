"use client";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Logo } from "../Logo";
import { DesktopNavMenu } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import Link from "next/link";

export function Navbar({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <header className="">
      <div className="min-h-[40vh]">
        <div className="mx-auto max-w-[100%] sm:max-w[95%] md:max-w-[90%] lg:max-w-[85%]">
          <div className="flex px-1 md:px-0 pt-1 md:pt-6 gap-1 items-center">
            <NavigationMenu className="hidden md:flex max-w-full items-center justify-between">
              <Link href="/">
                <Logo />
              </Link>
              <DesktopNavMenu />
            </NavigationMenu>
            <div className="w-full flex items-center md:hidden">
              <MobileNavbar />
            </div>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}
