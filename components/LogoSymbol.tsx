function LogoSymbol({
  color = "primary",
  size = "large",
}: {
  color?: string;
  size?: string;
}) {
  return (
    <svg
      width={size === "large" ? "26" : "16"}
      height={size === "large" ? "26" : "16"}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3711 23.8639L23.6958 11.1566"
        stroke={color === "primary" ? "#06B300" : "white"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6.69141 19.3918L19.0161 6.68448"
        stroke={color === "primary" ? "#06B300" : "white"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2 14.8401L14.3247 2.1328"
        stroke={color === "primary" ? "#06B300" : "white"}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default LogoSymbol;
