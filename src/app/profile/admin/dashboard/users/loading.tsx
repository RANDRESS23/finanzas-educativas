import pkg from "@/../package.json";

export default function LoadingUsersPage() {
  return (
    <main>
      <div className="pt-6 px-4">
        <div className="w-full grid grid-cols-1 gap-4">
          <div className="shadow dark:shadow-slate-700 rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Nuestros usuarios registrados
                </h3>
                <span className="text-base font-normal text-gray-500 dark:text-gray-300">
                  Usuarios registrados en {pkg.description}
                </span>
              </div>
              <div className="flex-shrink-0">
                <div role="status" className="max-w-sm animate-pulse">
                  <button className="text-sm p-2">
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
                            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Nombre usuario
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Se unió en
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Dinero en proceso
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 3 }, (_, i) => (
                          <tr key={i}>
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
                        ))}
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
  );
}
