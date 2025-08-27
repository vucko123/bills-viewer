import { useBillsTable } from "../hooks/useBillsTable"

const AllBillsView = () => {
  const billsTable = useBillsTable({ isFavorites: false })
  return <>{billsTable}</>
}

export default AllBillsView
