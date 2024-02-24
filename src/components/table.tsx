/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { LoaderSpinner } from './loader/loader'
import { converterNome, stringParaNumero } from '@/utils/scripts'

export default function TableFinance() {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  async function importaArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true)

    try {
      if (e.target.files !== null) {
        const reader = new FileReader()
        const files = e.target.files[0]

        reader.onload = (e: any) => {
          const result = JSON.parse(e.target.result)
          const formatedArray = result.map((res: any) => ({
            ...res,
            Portador: converterNome(res.Portador),
            Valor: stringParaNumero(res.Valor),
          }))
          setTableData(formatedArray)
        }
        reader.readAsText(files)
      }

      toast.success('Dados importados com sucesso!', {
        position: 'top-right',
        theme: 'dark',
      })
    } catch (error) {
      toast.error('Erro no envio do registro!', {
        position: 'top-right',
        theme: 'dark',
      })
    }
    setLoading(false)
  }
  return (
    <div className="my-4">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  dark:bg-blue-chill-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-chill-50 "
            placeholder="Search for items"
          />
        </div>
        <div className="bg-blue-chill-700 py-2 px-4 rounded-lg text-blue-chill-50">
          <label htmlFor="file">
            <input
              id="file"
              accept=".json"
              className="hidden "
              onChange={importaArquivo}
              type="file"
            />
            Importar dados
          </label>
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
              {tableData.map((data: any, index: number) => (
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
                    }).format(data.Valor)}
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
