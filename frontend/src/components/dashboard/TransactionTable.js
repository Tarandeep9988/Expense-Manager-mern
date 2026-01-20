

const TransactionTable = () => {
  return (
    <div className="border rounded-lg grow overflow-auto p-2">
      <table className=" w-full">
        <thead className="">
          <tr className="border-b">
            <th className="capitalize font-bold text-left">#</th>
            <th className="capitalize font-bold text-left">title</th>
            <th className="capitalize font-bold text-left">amount</th>
            <th className="capitalize font-bold text-left">category</th>
            <th className="capitalize font-bold text-left">description</th>
            <th className="capitalize font-bold text-left">type</th>
            <th className="capitalize font-bold text-left">delete / edit</th>
          </tr>
        </thead>
        <tbody className="border-t">
            <tr>
              <td className="capitalize">#</td>
              <td className="capitalize">title</td>
              <td className="capitalize">amount</td>
              <td className="capitalize">category</td>
              <td className="capitalize">description</td>
              <td className="capitalize">type</td>
              <td className="capitalize">delete / edit</td>  
            </tr>          
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable