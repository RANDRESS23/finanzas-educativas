const AccountCashIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-gray-600 dark:text-zinc-50 group-hover:text-sushi-500"
      {...props}
    >
      <path d="M11 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 6.72V20H0v-2c0-2.21 3.13-4 7-4 1.5 0 2.87.27 4 .72M24 20H13V3h11v17m-8-8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0M22 7a2 2 0 01-2-2h-3c0 1.11-.89 2-2 2v9a2 2 0 012 2h3c0-1.1.9-2 2-2V7z" />
    </svg>
  );
};

export default AccountCashIcon;
