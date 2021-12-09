import * as React from "react";

function SvgAvatar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#avatar_svg__clip0)">
        <path
          d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z"
          fill="#F3F4F6"
        />
        <path
          d="M32 27.992v4.01H0v-3.995A19.969 19.969 0 0116.005 20c6.539 0 12.347 3.139 15.995 7.991zM21.336 12a5.333 5.333 0 11-10.667 0 5.333 5.333 0 0110.667 0z"
          fill="#D1D5DB"
        />
      </g>
      <defs>
        <clipPath id="avatar_svg__clip0">
          <path
            d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z"
            fill="#fff"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgAvatar;
