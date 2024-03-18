import './App.css';
import { colors, createTheme,ThemeProvider } from "@mui/material";
import ResponsiveDrawer from './Drawer.tsx'

const myTheme=createTheme({
  satus:{
    danger:colors.red[700]
  },
  palette:{
    primary:{
      main:colors.green[300]
    },
    secondary:{
      main:colors.teal[400],
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={myTheme}>
    <div className="App">
      <ResponsiveDrawer></ResponsiveDrawer>
    </div>
    </ThemeProvider>
  );
}

export default App;
