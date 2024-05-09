import { PanelLeft } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { extraIcons, sideIcons } from "../Sidebar/constants";
import { LogoIconMobile } from "../Sidebar/LogoIcon";
import { SideIconMobile } from "../Sidebar/SideIcon";

export const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <LogoIconMobile />
          {sideIcons.map((sideIcon) => (
            <SideIconMobile key={sideIcon.title} {...sideIcon} />
          ))}
          <SideIconMobile key={extraIcons[0].title} {...extraIcons[0]} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
