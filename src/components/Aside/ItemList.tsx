import Link from 'next/link'

interface ItemListProps {
  href: string
  Icon: React.FC
  title: string
}

const ItemList: React.FC<ItemListProps> = ({ href, Icon, title }) => {
  return (
    <Link
      href={href}
      className="text-base text-gray-900 font-semibold rounded-lg hover:text-[#79ad34] hover:bg-gray-100 flex items-center p-2 group "
    >
      <Icon />
      <span className="ml-3 flex-1 whitespace-nowrap">{title}</span>
    </Link>
  )
}

export default ItemList
