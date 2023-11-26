const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3 w-3 group-hover:text-boston-blue-600"
      {...props}
    >
      <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
    </svg>
  );
};

export default ArrowDownIcon;
