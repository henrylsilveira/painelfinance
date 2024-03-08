import { DataProps } from '@/types/types'
import { LoaderSpinner } from './loader/loader'
import { SearchIcon } from 'lucide-react'

interface TableFinanceProps {
  tableData: DataProps[]
  loading: boolean
}

export default function TableFinance({
  tableData,
  loading,
}: TableFinanceProps) {
  return (
    <div className="my-4">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon className="size-4 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  dark:bg-blue-chill-800 dark:border-gray-600  dark:text-blue-chill-50 dark:placeholder-gray-400 leading-relaxed placeholder:text-base tracking-wider"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="shadow-lg sm:rounded-lg ">
        {loading ? (
          <LoaderSpinner />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 text-blue-chill-700 uppercase bg-gray-50 dark:bg-blue-chill-800 dark:text-blue-chill-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Data
                </th>
                <th scope="col" className="px-6 py-3">
                  Estabelecimento
                </th>
                <th scope="col" className="px-6 py-3">
                  Portador
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3">
                  Parcela
                </th>
              </tr>
            </thead>
            <tbody className="realative h-[100vh] overflow-y-auto ">
              {tableData.map((data: DataProps, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-blue-chill-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-blue-chill-800/50 hover:shadow-lg hover:border hover:border-blue-chill-300"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.Data}
                  </th>
                  <td className="px-6 py-4">{data.Estabelecimento}</td>
                  <td className="px-6 py-4">{data.Portador}</td>
                  <td className="px-6 py-4">
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(data.Valor as number)}
                  </td>
                  <td className="px-6 py-4">{data.Parcela}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
