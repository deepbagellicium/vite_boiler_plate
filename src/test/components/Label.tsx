import { FC } from "react";

interface LabelProps {
  label: string;
}
const Label: FC<LabelProps> = ({ label }) => {
  return <p>{label}</p>;
};

export default Label;
