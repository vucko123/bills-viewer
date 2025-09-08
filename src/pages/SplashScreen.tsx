import { Box } from "@mui/material"
import "../index.css"

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box className="loader" />
    </Box>
  )
}

export default SplashScreen
