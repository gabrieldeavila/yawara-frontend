import React, { useEffect, useState, useContext } from "react";
import useTheme from "../../../../states/Theme";
import useTitle from "../../../../states/Title";
import { ReactComponent as LadyYawara } from "../../../../assets/img/lady-yawara.svg";
import FormFields from "./FormFields";
import ModalAcc from "./ModalAcc";
import { Context } from "../../../../Contexts/GlobalContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import _ from "lodash";

export default function Account() {
  // redirecionar usuário
  const history = useHistory();

  // accountAction: true = user actions is "Entrar, otherwise it is going to be "Criar Conta";
  const [accountAction, setAccountAction] = useState(true);
  const [theme] = useTheme(false, true);

  const [title, setTitle] = useState("");
  const [modal, setModal] = useState(false);

  const { setBearerToken } = useContext(Context);

  useEffect(() => {
    let action;
    action = accountAction ? "Entrar" : "Criar Conta";
    setTitle(action);
  }, [accountAction]);

  useTitle(title);

  const onSave = async (values) => {
    // se for para registrar conta
    if (!accountAction) {
      toast.success("Criando conta... 😬", {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      });

      // requisição com dados
      await axios
        .post("http://127.0.0.1:8000/api/register", values)
        // deu bom
        .then(function (response) {
          setAccountAction(true);
          setBearerToken(response.data.data.token);

          history.push("/finish-register");

          toast.success("Conta criada, basta terminar o registro  🥳 ", {
            className:
              theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
          });
        })
        // deu ruim
        .catch((err) => {
          console.log(err.response);
          toast.error("Já existe uma conta com esse email 😖", {
            className:
              theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
          });
        });
    }
    // é para entrar na conta
    else {
      toast.success("Verificando credenciais... 🧐", {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      });

      await axios
        .post("http://127.0.0.1:8000/api/login", values, {})
        // logou
        .then(function (response) {
          toast.success("Logado 🥳", {
            className:
              theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
          });
          window.location.href = "/explore";

          setBearerToken(response.data.data.token);
        })
        // erro
        .catch((error) => {
          toast.error(`${error.response?.data?.data?.error} 😖`, {
            className:
              theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
          });
        });
    }
  };

  return (
    <div className="account">
      <div className="bg-green account-greeting">
        <h2 className={`trans-1 text-${theme[1]}`}>
          {accountAction ? "Acesse sua Yawa!" : "Crie sua Yawa!"}
        </h2>
        <div className="account-lady_yawara">
          <LadyYawara />
        </div>
      </div>

      <div className={`trans-1 account-form bg-${theme[1]}`}>
        <div className={`account-form-top`}>
          <div className="account-form-theme">{theme[0]}</div>
          <div className="account-form-top-options">
            <button
              onClick={() => setAccountAction(true)}
              className={`btn-opt-acc text-${theme[1]} ${
                !accountAction ? "isAccountActive" : ""
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setAccountAction(false)}
              className={`btn-opt-acc text-${theme[1]} ${
                accountAction ? "isAccountActive" : ""
              }`}
            >
              Criar Conta
            </button>
          </div>
        </div>
        <div className="account-form-header">
          <span
            onClick={() => setAccountAction(true)}
            className={`${accountAction ? "isAccountActive" : ""}`}
          >
            Entrar
          </span>
          ou
          <span
            onClick={() => setAccountAction(false)}
            className={`${!accountAction ? "isAccountActive" : ""}`}
          >
            Criar Conta
          </span>
        </div>
        <div className="account-form-main">
          <FormFields onSave={onSave} action={title} theme={`${theme[1]}`} />
          {title === "Entrar" && (
            <div className="account-form-forgot">
              <span onClick={() => setModal(true)}>Esqueci minha senha</span>
            </div>
          )}
        </div>
      </div>
      {modal && <ModalAcc setModal={setModal} theme={theme[1]} />}
    </div>
  );
}
