import * as React from "react";

interface Props {
  className?: string;
  borderClassName?: string;
  title?: string;
}

const Divider: React.FC<Props> = ({
  title = null,
  className = "",
  borderClassName = "border-gray-300",
}) => {
  return (
    <div className={`flex w-full items-center ${className}`}>
      <div className={`flex-grow border-b ${borderClassName}`} />
      {title && <span className="px-10">{title}</span>}
      <div className={`flex-grow border-b ${borderClassName}`} />
    </div>
  );
};

export default Divider;
