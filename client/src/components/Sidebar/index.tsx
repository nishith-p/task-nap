import { sideIcons, extraIcons } from "./constants";
import { SideIcon } from "./SideIcon";
import { LogoIcon } from "./LogoIcon";

export const Sidebar = () => {
  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <LogoIcon />
          {sideIcons.map((sideIcon) => (
            <SideIcon key={sideIcon.title} {...sideIcon} />
          ))}
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <SideIcon
            title={extraIcons[0].title}
            link={extraIcons[0].link}
            children={extraIcons[0].children}
          />
        </nav>
      </aside>
    </div>
  );
};
