const ArrowDown: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-6 w-6 group-hover:text-sushi-500"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 1a.5.5 0 01.5.5v11.793l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L7.5 13.293V1.5A.5.5 0 018 1z"
      />
    </svg>
  );
};

export default ArrowDown;
