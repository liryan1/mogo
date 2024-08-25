import { Logo } from "@/components/Logo";
import { navigationMenuConfig } from "@/components/nav/config";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const baseUlClassName =
  "grid gap-3 p-4 grid-cols-1 w-[300px] md:w-[400px] lg:w-[500px]";
const baseUlWithCardClassName =
  "grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]";

export function DesktopNavMenu() {
  return (
    <NavigationMenuList>
      {navigationMenuConfig.map((c, i) => {
        if (c.type === "hover") {
          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger>{c.trigger}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className={c.card ? baseUlWithCardClassName : baseUlClassName}
                >
                  {c.card && (
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-begin rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                          href={c.card.href}
                        >
                          <Logo />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {c.card.title}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {c.card.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  )}
                  {c.data.map((component) => (
                    <ListItem
                      key={component.href}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        } else {
          return c.data.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ));
        }
      })}
    </NavigationMenuList>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
