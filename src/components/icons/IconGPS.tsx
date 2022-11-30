interface IconGPSProps extends React.SVGProps<SVGSVGElement> {}

const IconGPS = ({ className }: IconGPSProps) => {
  return (
    <svg height="16" viewBox="0 0 12 16" width="12" className={className} fill="#ee4d2d">
      <path
        d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default IconGPS;
