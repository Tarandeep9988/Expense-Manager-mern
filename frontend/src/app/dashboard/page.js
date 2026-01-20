import Navbar from "@/components/dashboard/Navbar"
import TransactionSection from "@/components/dashboard/TransactionSection"

const page = () => {
  return (
    <main className="h-screen w-screen p-2 flex flex-col gap-2">
      <Navbar />
      <TransactionSection />
    </main>
  )
}

export default page