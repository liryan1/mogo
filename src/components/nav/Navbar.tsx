"use client";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { EaseInOutDiv } from "../animation/EaseInOutDiv";
import { Logo } from "../Logo";
import { DesktopNavMenu } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export function Navbar() {
  return (
    <header className="mx-auto max-w-[100%] sm:max-w[95%] md:max-w-[90%] lg:max-w-[85%] sm:mb-4">
      <EaseInOutDiv className="flex px-1 md:px-0 pt-1 md:pt-6 gap-1 items-center">
        <NavigationMenu className="hidden md:flex max-w-full items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <DesktopNavMenu />
        </NavigationMenu>
        <div className="w-full flex items-center md:hidden">
          <MobileNavbar />
        </div>
      </EaseInOutDiv>
    </header>
  );
}
