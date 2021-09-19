import React from "react";
import useTheme from "../../../../states/Theme";
import useTitle from "../../../../states/Title";
import { ReactComponent as LadyYawara } from "../../../../assets/img/lady-yawara.svg"

export default function Account() {
  useTitle("Criar Conta");
  const theme = useTheme(false, true);

  return (
    <div className="account">
      <div className="bg-green account-greeting">
        <h2 className={`trans-1 text-${theme[1]}`}>Crie uma Yawa!</h2>
        <div className="account-lady_yawara">
          <LadyYawara />
        </div>
      </div>

      <div className={`trans-1 account-form bg-${theme[1]}`}>
        <div className={`account-form-top`}>
          <div className="account-form-theme">
            {theme[0]}
          </div>
          <div className="account-form-top-options">
            <button className={`text-${theme[1]} isAccountActive`}>Entrar</button>
            <button className={`text-${theme[1]}`}>Criar Conta</button>
          </div>
        </div>
      </div>

    </div>
  )

}