import React from "react";

interface IDayProps {
  x: number;
  y: number;
  fill: string;
  stroke: string;
  onClick: () => void;
}

const Day: React.FC<IDayProps> = props => {
  return <rect width="17" height="17" {...props} />;
};

export default Day;
