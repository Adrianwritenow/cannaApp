import * as React from 'react';

import { SVGProps } from 'react';

const SvgEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.4}
      d="M133.222 9.78c9.423 3.175 11.062 20.893 16.797 37.383 5.736 16.592 15.568 32.057 14.954 47.318-.717 15.158-11.779 30.111-26.22 32.364-14.339 2.254-31.955-7.988-48.137-10.037-16.08-2.048-30.726 4.199-44.86 1.844-14.134-2.458-27.654-13.417-36.154-28.678a76.668 76.668 0 0 1-7.887-53.053C5.71 18.485 17.385 1.176 33.158.05 49.033-.975 69.108 14.184 87.85 16.027c18.641 1.946 35.95-9.423 45.372-6.248Z"
      fill="#8CC199"
    />
    <path
      d="M114.128 56.869c-3.277-7.019-6.53-14.049-9.841-21.051-1.243-2.63-3.507-3.591-5.797-2.621-2.42 1.026-3.318 3.462-2.17 6.184.888 2.108 1.91 4.159 2.866 6.238.646 1.405.872 2.81-.782 3.63-1.687.835-2.609-.236-3.28-1.643-1.012-2.116-2.033-4.228-3.076-6.397L36.331 67.224c1.152 2.497 2.122 4.663 3.148 6.802.721 1.503 1.034 2.972-.796 3.802-1.88.854-2.688-.52-3.361-1.968-.515-1.106-1.07-2.193-1.67-3.417-5.382 2.522-10.42 5.277-15.996 7.943.95 2.012.95 2.012 2.029 4.28a1.789 1.789 0 0 1-.813 2.21c-.614.397-2.132.896-2.815-.476-.279-.56-.273-.639-.83-1.75-1.684.78-3.754 1.829-5.355 2.518-1.6.688-2.955 1.752-5.066.69-1.523-.767-3.255 1.105-2.502 2.801 1.7 3.831 2.694 6 4.692 10.041.9 1.822 3.272 1.659 3.783-.57.404-1.758 1.39-1.81 3.586-2.818 3.806-1.746 5.317-2.48 9.107-4.244l1.665 2.811 19.922-9.254 1.8 3.065 3.5-1.503c.446 1.06.81 1.912 1.158 2.635 1.67 3.458 1.104 4.142.04 6.337a14589.382 14589.382 0 0 0-26.4 54.689c-1.272 2.643-.785 4.665 1.257 5.672 2.025.997 3.989.095 5.254-2.491 2.088-4.27 4.243-8.513 6.159-12.861a4.125 4.125 0 0 1 4.387-2.837c12.412.128 24.825.17 37.238.126a2.85 2.85 0 0 1 2.978 1.938c2.21 4.685 4.52 9.322 6.84 13.954.94 1.876 2.263 3.274 4.609 2.301 2.036-.845 2.741-3.072 1.67-5.345A5320.598 5320.598 0 0 0 82.2 124.198c-4.684-9.754-9.465-19.461-14.103-29.237a3.045 3.045 0 0 1 .237-2.757c2.622-3.577 3.253-5.128 2.201-7.538-.708-1.625-.655-1.41-2.196-4.933l38.173-17.814c2.61 2.737 4.697 3.257 6.777 1.793 2.067-1.453 2.333-3.64.838-6.843Zm-36.165 75.277h-35.37l17.725-36.444 17.645 36.444ZM23.846 55.458h-1.709v-1.709a1.167 1.167 0 0 0-2.335 0v1.709h-1.709a1.167 1.167 0 1 0 0 2.335h1.709V59.5a1.168 1.168 0 1 0 2.335 0v-1.708h1.709a1.168 1.168 0 0 0 0-2.335ZM135.702 39.656h-2.652v-2.651a1.8 1.8 0 0 0-.529-1.284 1.808 1.808 0 0 0-1.977-.394 1.808 1.808 0 0 0-1.117 1.678v2.651h-2.652a1.81 1.81 0 0 0-1.816 1.812 1.815 1.815 0 0 0 1.122 1.675c.22.09.456.137.694.137h2.652v2.651a1.818 1.818 0 0 0 .529 1.284 1.808 1.808 0 0 0 1.977.394 1.808 1.808 0 0 0 1.117-1.678V43.28h2.652a1.812 1.812 0 0 0 0-3.624ZM152.367 97.923h-3.036v-3.037a2.076 2.076 0 0 0-4.151 0v3.037h-3.036a2.077 2.077 0 0 0-2.075 2.075 2.075 2.075 0 0 0 2.075 2.075h3.036v3.036a2.076 2.076 0 1 0 4.151 0v-3.036h3.036a2.078 2.078 0 0 0 2.075-2.075 2.075 2.075 0 0 0-2.075-2.075ZM42.448 30.205a1.673 1.673 0 0 0-.494-1.192 1.726 1.726 0 0 0-2.384 0l-1.43 1.43-1.43-1.43a1.727 1.727 0 0 0-2.384 0 1.685 1.685 0 0 0 0 2.384l1.43 1.43-1.43 1.43a1.685 1.685 0 0 0 0 2.385 1.727 1.727 0 0 0 2.383 0l1.43-1.43 1.43 1.428a1.686 1.686 0 1 0 2.385-2.383l-1.43-1.43 1.43-1.429a1.675 1.675 0 0 0 .494-1.193Z"
      fill="#2E864E"
    />
    <path
      d="M106.253 114.498a1.163 1.163 0 0 0-1.395-1.144 1.167 1.167 0 0 0-.597.319l-.99.99-.99-.99a1.196 1.196 0 0 0-1.651-.001 1.165 1.165 0 0 0 0 1.652l.99.99-.99.99a1.166 1.166 0 0 0-.001 1.65 1.2 1.2 0 0 0 1.652 0l.99-.99.989.99a1.181 1.181 0 0 0 .826.344 1.174 1.174 0 0 0 1.169-1.168 1.167 1.167 0 0 0-.344-.827l-.989-.989.989-.99a1.159 1.159 0 0 0 .342-.826ZM23.001 14a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2.58a1.42 1.42 0 1 1 0 2.84 1.42 1.42 0 0 1 0-2.84ZM66.073 37.937a3.531 3.531 0 1 0-.001 7.061 3.531 3.531 0 0 0 0-7.061Zm0 2.278a1.252 1.252 0 1 1 0 2.504 1.252 1.252 0 0 1 0-2.504ZM68.038 7.047a4.983 4.983 0 1 0 0 9.966 4.983 4.983 0 0 0 0-9.966Zm0 7.248a2.265 2.265 0 1 1 0-4.53 2.265 2.265 0 0 1 0 4.53ZM115.439 79a4.438 4.438 0 1 0-.001 8.877 4.438 4.438 0 0 0 .001-8.877Zm0 6.322a1.885 1.885 0 1 1 0-3.769 1.885 1.885 0 0 1 0 3.77Z"
      fill="#2E864E"
    />
  </svg>
);

export default SvgEmptyState;
