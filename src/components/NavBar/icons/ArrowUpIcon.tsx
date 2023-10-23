const ArrowUpIcon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3 w-3 group-hover:text-[#008aae]"
      {...props}
    >
      <path d="M3 19h18a1.002 1.002 0 00.823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 003 19z" />
    </svg>
  )
}

export default ArrowUpIcon
