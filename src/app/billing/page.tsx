'use client'
import CardPortion from '@/components/cardPortions/cardPortions'
import TableFinance from '../../components/table'
import { useState } from 'react'
import { converterNome, stringParaNumero } from '@/utils/scripts'
import { toast } from 'react-toastify'
import { DataProps } from '@/types/types'

export default function Billing() {
  const [tableData, setTableData] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(false)

  async function importaArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true)

    try {
      if (e.target.files !== null) {
        const reader = new FileReader()
        const files = e.target.files[0]

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onload = (e: any) => {
          const result = e.target.result
          const formatedArray = JSON.parse(result).map((res: DataProps) => ({
            ...res,
            Portador: converterNome(res.Portador),
            Valor: stringParaNumero(String(res.Valor)),
            // Data:
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

  let totalPortions: number = 0
  let totalMonths: number = 0
  function sumPortions(): number {
    // eslint-disable-next-line array-callback-return
    tableData.map((data) => {
      if (data.Parcela !== '-') {
        return (totalPortions = totalPortions + data.Valor)
      }
    })
    return totalPortions
  }

  function totalMonth(): number {
    // eslint-disable-next-line array-callback-return
    tableData.map((data) => {
      if (data.Valor >= 0) {
        return (totalMonths = totalMonths + data.Valor)
      }
    })
    return totalMonths
  }

  return (
    <div className="max-w-[1200px] flex flex-1 flex-col">
      <div className="gap-4 flex flex-1 flex-col">
        <div className="bg-blue-chill-900 mt-2 rounded-lg">
          <nav className="flex flex-1 px-2 py-4">
            <ul className="flex flex-1 justify-between">
              <li>Importar</li>
              <li>Importar</li>
              <li>Importar</li>
              <li>Importar</li>
            </ul>
          </nav>
        </div>
        <div className="bg-blue-chill-700 py-2 px-4 rounded-lg text-blue-chill-50 ">
          <label htmlFor="file">
            <input
              id="file"
              accept=".json"
              className="hidden"
              onChange={importaArquivo}
              type="file"
            />
            Importar dados
          </label>
        </div>
        <div>
          <TableFinance tableData={tableData} loading={loading} />
        </div>
      </div>
      {/* Div Cards Portions */}
      <div className="max-w-[1200px]">
        <div className="flex grid-cols-3 justify-between gap-5">
          <CardPortion
            title="Total Portions of the Month"
            content={sumPortions()}
          />
          <CardPortion title="Total spent Month" content={totalMonth()} />
          <CardPortion title="Another info" content={totalMonth()} />
        </div>
      </div>
    </div>
  )
}
