import { SvgIcon } from "@mui/material";

type IconProps = {
  props?: React.SVGProps<SVGSVGElement>;
  id: string;
};

const Icon = ({ props = {}, id }: IconProps) => {
  return (
    <SvgIcon>
      <svg {...props}>
        <use href={`/sprites.svg#${id}`} />
      </svg>
    </SvgIcon>
  );
};

export default Icon;
