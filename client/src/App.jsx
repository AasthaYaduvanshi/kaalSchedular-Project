import { customTheme } from "./themes"
import { Toaster } from "react-hot-toast"
import { StyledEngineProvider, CssBaseline } from "@mui/material"
// import Routes from "./Routes";
import Routes from "@routes"
import { ColorModeProvider } from "@contexts/DarkModeContext"
const toasterOptions = {
  style: { fontWeight: 500 },
}

const App = () => {
  const appTheme = customTheme()

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeProvider>
        <CssBaseline />
        <Toaster toastOptions={toasterOptions} />
        <Routes />
      </ColorModeProvider>
    </StyledEngineProvider>
  )
}

export default App
