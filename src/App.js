import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ContextProvider from "./service";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Router />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
