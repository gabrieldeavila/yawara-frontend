import ReactDOM from "react-dom";
import Routes from "./routes/routes";
import { CookiesProvider } from "react-cookie";
ReactDOM.render(
  <CookiesProvider>
    <Routes />
  </CookiesProvider>,
  document.getElementById("root")
);
