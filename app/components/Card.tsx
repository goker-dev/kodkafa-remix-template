import type { ReactElement } from "react";
import * as React from "react";

type Props = {
  children: ReactElement | ReactElement[];
  className?: string;
};

export default function Card({ children, className = "flex flex-col" }: Props) {
  return (
    <div
      data-cy="Card"
      className={`rounded-lg shadow hover:shadow-lg transition dark:shadow-black/50 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
