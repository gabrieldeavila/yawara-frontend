import useTheme from "../../../../states/Theme";
import { ReactComponent as LadyYawara } from "../../../../assets/img/lady-admin.svg";
import FormFields from "../../../yawara_user/pages/Account/FormFields";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function AdminAccount() {
  const [theme] = useTheme(false, true);

  return (
    <div className="account">
      <div className="bg-green account-greeting">
        <h2
          style={{ textAlign: "center" }}
          className={`trans-1 text-${theme[1]}`}
        >
          Acesse a Conta de <br />
          Administrador
        </h2>
        <div className="account-lady_yawara">
          <LadyYawara />
        </div>
      </div>
      <div className={`trans-1 account-form bg-${theme[1]}`}>
        <div className={`account-form-top`}>
          <div className="account-form-theme">{theme[0]}</div>
        </div>
        <div className="account-form-main">
          <FormFields action="Entrar" theme={`${theme[1]}`} />
        </div>
      </div>
    </div>
  );
}
