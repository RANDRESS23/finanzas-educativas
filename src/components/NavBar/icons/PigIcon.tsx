const PigIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      className="h-6 w-6 text-gray-600 dark:text-zinc-50 group-hover:text-sushi-500"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M15 11v.01M5.173 8.378a3 3 0 114.656-1.377" />
      <path d="M16 4v3.803A6.019 6.019 0 0118.658 11h1.341a1 1 0 011 1v2a1 1 0 01-1 1h-1.342c-.336.95-.907 1.8-1.658 2.473V19.5a1.5 1.5 0 01-3 0v-.583a6.04 6.04 0 01-1 .083h-4a6.04 6.04 0 01-1-.083v.583a1.5 1.5 0 01-3 0v-2L5 17.473A6 6 0 018.999 7h2.5l4.5-3H16z" />
    </svg>
  );
};

export default PigIcon;
