import Link from 'next/link'

interface ItemListDropDownProps {
  title: string
  description: string
  Icon: React.FC
  idSection: string
  handleResetMenus: () => void
}

function ItemListDropDown({
  title,
  description,
  Icon,
  idSection,
  handleResetMenus
}: ItemListDropDownProps): React.ReactNode {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-base leading-6 hover:bg-gray-50">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        <Icon />
      </div>
      <div className="flex-auto">
        <Link
          href={`/about/#${idSection}`}
          className="block font-semibold text-gray-900 hover:text-[#79ad34]"
          onClick={handleResetMenus}
        >
          {title}
          <span className="absolute inset-0"></span>
        </Link>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default ItemListDropDown
