export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      {children}
    </div>
  );
}
