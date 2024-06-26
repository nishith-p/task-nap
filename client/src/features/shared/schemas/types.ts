export type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

export enum ProjectCategory {
  Business = "BUSINESS",
  Marketing = "MARKETING",
  Software = "SOFTWARE",
}

export enum ProjectStatus {
  Open = "OPEN",
  Close = "CLOSE",
}
