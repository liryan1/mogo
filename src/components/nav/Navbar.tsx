"use client";

import { DesktopNavMenu } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function Navbar({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <header className="">
      <AuroraBackground className="min-h-[40vh]">
        <div className="mx-auto max-w-[100%] sm:max-w[95%] md:max-w-[90%] lg:max-w-[85%]">
          <div className="flex px-1 md:px-0 pt-1 md:pt-6 gap-1 items-center">
            <NavigationMenu className="hidden md:flex max-w-full items-center justify-between">
              <DesktopNavMenu />
              <Button disabled variant="ghost" size="icon">
                <BsSearch />
              </Button>
            </NavigationMenu>
            <div className="w-full flex items-center md:hidden">
              <MobileNavbar />
            </div>
          </div>
          {children}
        </div>
      </AuroraBackground>
    </header>
  );
}
