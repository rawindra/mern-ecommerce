import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import ReactQueryProvider from './providers/ReactQueryProvider';
import Router from "./router";

function App() {
  return (
    <ReactQueryProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReactQueryProvider>
  )
}

export default App
