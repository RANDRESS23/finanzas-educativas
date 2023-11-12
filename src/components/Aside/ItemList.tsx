import Link from "next/link";

interface ItemListProps {
  href: string;
  Icon: React.FC;
  title: string;
}

export default function ItemList({ href, Icon, title }: ItemListProps) {
  return (
    <Link
      href={href}
      className="text-base font-semibold rounded-lg hover:text-sushi-500 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center p-2 group "
    >
      <Icon />
      <span className="ml-3 flex-1 whitespace-nowrap">{title}</span>
    </Link>
  );
}
