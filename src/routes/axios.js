import axios from "axios";
import { useContext } from "react";
import { Context } from "../Contexts/GlobalContext";

// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

// export const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });
// const { bearerToken } = useContext(Context);

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
  // headers: { Authorization: `Bearer ${bearerToken}` },
});
