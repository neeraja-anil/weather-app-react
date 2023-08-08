import React from 'react'
import { CssBaseline } from "@mui/material";
import TopDiv from './components/TopDiv';
import { GlobalContextProvider } from './context';



function App() {

  return (
    <div className="App">
      <GlobalContextProvider>
        <CssBaseline />
        <TopDiv />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
