interface IProps {
  children: React.ReactElement;
}
export default function AdminUsersLayout({ children }: IProps) {
  return (
    <div>
      <div className="flex overflow-hidden">
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 dark:bg-slate-800/20 py-20 relative overflow-y-auto lg:ml-64"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
