import './App.css';
import { colors, createTheme,ThemeProvider } from "@mui/material";
import Display from './components/Display';

const myTheme=createTheme({
  satus:{
    danger:colors.red[700]
  },
  palette:{
    primary:{
      main:colors.blue[800]
    },
    secondary:{
      main:colors.green[600],
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={myTheme}>
    <div className="App">
      <Display/>
    </div>
    </ThemeProvider>
  );
}

export default App;
