export default function LoadingHomePreviewPage() {
  return (
    <section className="top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="grid place-items-center">
          <div className="w-1/2">
            <div className="bg-zinc-50 border rounded-xl shadow-md">
              <div className="text-center">
                <div className="flex items-center justify-start flex-1 text-green-500 text-base font-bold m-10">
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="rounded-full p-16 bg-gray-200" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center text-center p-4">
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-4 bg-gray-200 rounded-full w-28 my-3" />
                  <div className="h-3 bg-gray-200 rounded-full w-36 my-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
