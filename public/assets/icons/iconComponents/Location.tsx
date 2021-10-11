import * as React from "react";

function SvgLocation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 7.33331L14.6667 1.33331L8.66667 14L7.33333 8.66665L2 7.33331Z"
        fill="#22A259"
      />
    </svg>
  );
}

export default SvgLocation;
