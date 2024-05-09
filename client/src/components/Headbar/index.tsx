import { AvatarMenu } from "./AvatarMenu";
import { SearchBar } from "./Search";
import { SidebarMobile } from "./SidebarMobile";

import { Breadcrumbs } from "../Breadcrumbs";

export const Headbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarMobile />
      <Breadcrumbs />
      <SearchBar />
      <AvatarMenu />
    </header>
  );
};
