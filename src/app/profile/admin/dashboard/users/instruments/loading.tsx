export default function LoadingPage() {
  return (
    <div className="top-0 left-0 right-0 h-screen flex items-center justify-center overflow-hidden">
      <div
        className="inline-block h-8 w-8 animate-[spin_.5s_linear_infinite] rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
