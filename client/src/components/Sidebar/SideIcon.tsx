import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type SideIconProps = {
  children: React.ReactNode;
  title: string;
  link: string;
};

export const SideIcon = ({ children, title, link }: SideIconProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={link}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          {children}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
};

export const SideIconMobile = ({ children, title, link }: SideIconProps) => {
  return (
    <Link
      to={link}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    >
      {children}
      {title}
    </Link>
  );
};
