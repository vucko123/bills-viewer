import { useBillsTable } from "../hooks/useBillsTable"

const FavoriteBillsView = () => {
  const billsTable = useBillsTable({ isFavorites: true })
  return <>{billsTable}</>
}

export default FavoriteBillsView
