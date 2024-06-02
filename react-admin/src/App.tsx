import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ReactQueryProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;
