import { Navigate, Route, Routes } from "react-router-dom"
import AllBillsView from "./pages/AllBillsView"
import FavoriteBillsView from "./pages/FavoriteBillsView"
import { NavigationTabs } from "./components/NavigationTabs"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/bills/all" replace />} />

        <Route path="/bills" element={<NavigationTabs />}>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all" element={<AllBillsView />} />
          <Route path="favorites" element={<FavoriteBillsView />} />
          <Route path="lukaa" element={<FavoriteBillsView />} />
        </Route>

        <Route path="*" element={<Navigate to="/bills/all" replace />} />
      </Routes>
    </>
  )
}

export default App
