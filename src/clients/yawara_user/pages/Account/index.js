import React, { useEffect, useState } from "react";
import useTheme from "../../../../states/Theme";
import useTitle from "../../../../states/Title";
import { ReactComponent as LadyYawara } from "../../../../assets/img/lady-yawara.svg";
import FormFields from "./FormFields";
import ModalAcc from "./ModalAcc";

export default function Account() {
  // accountAction: true = user actions is "Entrar, otherwise it is going to be "Criar Conta";
  const [accountAction, setAccountAction] = useState(true);
  const [theme] = useTheme(false, true);

  const [title, setTitle] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let action;
    action = accountAction ? "Entrar" : "Criar Conta";
    setTitle(action);
  }, [accountAction]);

  useTitle(title);

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
          <FormFields action={title} theme={`${theme[1]}`} />
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
