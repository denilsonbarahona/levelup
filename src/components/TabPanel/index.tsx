import { ReactNode } from "react";

interface TabPanelProps {
  readonly children: ReactNode;
}

export const TabPanel = ({ children }: TabPanelProps) => {
  return <div>{children}</div>;
};
