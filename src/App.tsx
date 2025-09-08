import { Navigate, Route, Routes } from "react-router-dom"
import AllBillsView from "./pages/AllBillsView"
import FavoriteBillsView from "./pages/FavoriteBillsView"
import { NavigationTabs } from "./components/NavigationTabs"
import { useEffect, useState } from "react"
import SplashScreen from "./pages/SplashScreen"

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

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
