import TransactionTable from "./TransactionTable"


const TransactionSection = () => {
  return (
    <main className="grow flex flex-col gap-2">
      <button className="bg-blue-500 py-2 rounded-lg cursor-pointer border">Add Transaction</button>
      <TransactionTable />
    </main>
  )
}

export default TransactionSection