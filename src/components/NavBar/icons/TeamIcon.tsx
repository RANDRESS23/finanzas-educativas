const TeamIcon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-gray-600 group-hover:text-sushi-500"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 11a5 5 0 015 5v6H7v-6a5 5 0 015-5zm-6.712 3.006a6.983 6.983 0 00-.28 1.65L5 16v6H2v-4.5a3.5 3.5 0 013.119-3.48l.17-.014zm13.424 0A3.501 3.501 0 0122 17.5V22h-3v-6c0-.693-.1-1.362-.288-1.994zM5.5 8a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm13 0a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM12 2a4 4 0 110 8 4 4 0 010-8z" />
    </svg>
  );
};

export default TeamIcon;
