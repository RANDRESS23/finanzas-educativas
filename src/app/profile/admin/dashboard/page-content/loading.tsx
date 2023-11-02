export default function LoadingPageContent() {
  return (
    <div>
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-50 py-20 relative overflow-y-auto lg:ml-64">
          <div className="pt-6 px-4">
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} role="status" className="max-w-sm animate-pulse">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-7 bg-gray-200 rounded-full w-48 mt-1" />
                        <div className="h-2.5 bg-gray-200 rounded-full w-40 mt-4" />
                      </div>
                      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        <div className="rounded-full p-7 bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
