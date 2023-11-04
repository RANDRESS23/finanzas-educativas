const ArrowUp: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-6 w-6 group-hover:text-sushi-500"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 15a.5.5 0 00.5-.5V2.707l3.146 3.147a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 10.708.708L7.5 2.707V14.5a.5.5 0 00.5.5z"
      />
    </svg>
  );
};

export default ArrowUp;
