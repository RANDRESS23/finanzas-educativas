export default function LoadingPage() {
  return (
    <div className="top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="spinner-box" role="status">
        <div className="leo-border-1">
          <div className="leo-core-1" />
        </div>
        <div className="leo-border-2">
          <div className="leo-core-2" />
        </div>
      </div>
    </div>
  );
}
