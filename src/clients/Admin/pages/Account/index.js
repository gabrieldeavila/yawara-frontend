import useTheme from "../../../../states/Theme";
import { ReactComponent as LadyYawara } from "../../../../assets/img/lady-admin.svg";
import FormFields from "../../../yawara_user/pages/Account/FormFields";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useTitle from "../../../../states/Title";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../../../../Contexts/GlobalContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export default function AdminAccount() {
  const history = useHistory();

  const [theme] = useTheme(false, true);

  const { setBearerToken, reload, setReload } = useContext(Context);

  const onSave = async (values) => {
    await axios
      .post("http://127.0.0.1:8000/api/admin-login", values, {})
      .then((response) => {
        setBearerToken(response.data.data.token);
        window.location.href = "/admin/tags-management";
        // setReload(!reload);
      })
      .catch((error) => {
        toast.error(`${error.response.data.data.error} 😖`, {
          className:
            theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
        });
      });
  };
  useTitle("Entrar");
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
          <FormFields onSave={onSave} action="Entrar" theme={`${theme[1]}`} />
        </div>
      </div>
    </div>
  );
}
