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
        d="M2 7.333l12.667-6-6 12.667-1.334-5.333L2 7.333z"
        fill="#22A259"
      />
    </svg>
  );
}

export default SvgLocation;
