import TableFinance from '../components/table'
export default function Home() {
  return (
    <div className="max-w-[1200px] gap-4 flex flex-1 flex-col">
      <div className="bg-blue-chill-900 mt-2 rounded-lg">
        <nav className="flex flex-1 px-2 py-4 ">
          <ul className="flex flex-1 justify-between">
            <li>Importar</li>
            <li>Importar</li>
            <li>Importar</li>
            <li>Importar</li>
          </ul>
        </nav>
      </div>
      <div>
        <TableFinance />
      </div>
    </div>
  )
}
