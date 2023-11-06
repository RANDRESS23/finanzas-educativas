import metaKeys from "@/meta/metaKeys";

export default function LoadingPageContent() {
  return (
    <div>
      <div className="flex overflow-hidden">
        <div className="h-full w-full bg-gray-50 dark:bg-slate-800/20 py-20 relative overflow-y-auto lg:ml-64">
          <div className="pt-6 px-4">
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {metaKeys.map(({ key, title }) => (
                <div
                  key={key}
                  className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 "
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold">
                        {title}
                      </span>
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-40 mt-4" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="rounded-full p-7 bg-gray-200 dark:bg-gray-700" />
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
