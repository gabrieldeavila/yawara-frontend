import ReactDOM from "react-dom";
import Routes from "./routes/routes";
import GlobalContext from "./Contexts/GlobalContext";

ReactDOM.render(
  <GlobalContext>
    <Routes />
  </GlobalContext>,
  document.getElementById("root")
);
