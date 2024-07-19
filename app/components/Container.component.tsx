import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};
export const Container = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`grow max-w-7xl mx-auto h-full 
           relative py-4 sm:py-8 pb-10 
           px-4 landscape:sm:px-8 xl:px-0
           w-full
           ${className}`}
    >
      {children}
    </div>
  );
};
