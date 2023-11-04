export default function LoadingUsersPage() {
  return (
    <div className="flex overflow-hidden">
      <div
        id="main-content"
        className="h-full w-full bg-gray-50 dark:bg-slate-800/20 py-20 relative overflow-y-auto lg:ml-64"
      >
        <main>
          <div className="pt-6 px-4">
            <div className="w-full grid grid-cols-1 gap-4">
              <div className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="mb-4 flex items-center justify-between">
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-48 my-4" />
                    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-52 my-4" />
                  </div>
                  <div className="flex-shrink-0">
                    <div role="status" className="max-w-sm animate-pulse">
                      <button className="text-sm font-medium text-cyan-600 rounded-lg p-2">
                        <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-14" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <div className="overflow-x-auto rounded-lg">
                    <div className="align-middle inline-block min-w-full">
                      <div className="shadow dark:shadow-slate-700 overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800/20">
                          <thead className="bg-gray-50 dark:bg-slate-800/50">
                            <tr>
                              <th
                                scope="col"
                                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-32 my-1" />
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-32 my-1" />
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-32 my-1" />
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full w-32 my-1" />
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-52" />
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-52" />
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-52" />
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                <div
                                  role="status"
                                  className="max-w-sm animate-pulse"
                                >
                                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-52" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
