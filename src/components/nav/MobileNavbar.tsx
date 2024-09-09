import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { navigationMenuConfig } from "@/components/nav/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export function MobileNavbar() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between">
      <Link href="/">
        <Logo h={30} w={90} />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8" variant="ghost" size="icon">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {navigationMenuConfig.map((c, i) => {
            if (c.type === "hover") {
              return (
                <div key={i}>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>{c.trigger}</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {c.data.map((item) => (
                      <DropdownMenuItem
                        key={item.title}
                        onClick={() => router.push(item.href)}
                      >
                        {item.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </div>
              );
            } else {
              return c.data.map((item) => (
                <div key={i}>
                  {i !== 0 && <DropdownMenuSeparator />}
                  <DropdownMenuItem onClick={() => router.push(item.href)}>
                    {item.title}
                  </DropdownMenuItem>
                </div>
              ));
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
