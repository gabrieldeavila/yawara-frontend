import { Logo, StyledWrapper } from "../../../../components/Decoration";
import Title from "../../../../components/Title";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.min.css";
import useTheme from "../../../../states/Theme";
import { Context } from "../../../../Contexts/GlobalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function PasswordReset() {
  const [theme] = useTheme(false, true);
  const { setHideNavbar, setHideSidebar } = useContext(Context);

  const StyledForm = styled(Form)`
    width: 100%;
  `;

  const required = "É necessário preencher este campo";
  let { token } = useParams();

  useEffect(() => {
    console.log(token);
    setHideSidebar(true);
    setHideNavbar(true);
  }, []);

  return (
    <>
      <Logo />
      <Title title="Recuperação de Senha" />
      <StyledWrapper items="start" justify="start" direction="column">
        <Formik
          initialValues={{
            new_password: "",
            confirm_password: "",
          }}
          validationSchema={Yup.object().shape({
            new_password: Yup.string()
              .min(4, "Senha pequena")
              .required(required),
            confirm_password: Yup.string()
              .oneOf([Yup.ref("new_password"), null], "Senhas não são iguais")
              .min(4, "Senha pequena")
              .required(required),
          })}
          onSubmit={async (values) => {
            await axios({
              method: "post",
              data: {
                token: token,
                new_password: values.new_password,
              },
              url: "http://127.0.0.1:8000/api/update-password",
            })
              .then((response) => {
                if (response.data.success) {
                  toast.success(
                    `Conta Atualizada! Basta logar, redirecionando em 2s`,
                    {
                      className:
                        theme[1] === "light"
                          ? "toast-theme--light"
                          : "toast-theme--dark",
                    }
                  );

                  setTimeout(() => {
                    window.location.href = "/account";
                  }, 2000);
                }
              })
              .catch((err) => {
                console.log(err.response);
              });
          }}
        >
          {({ errors, touched }) => (
            <StyledForm autoComplete="off">
              <div className="field floating">
                <Field
                  placeholder="Placeholder"
                  className="floating__input"
                  name="new_password"
                  type="password"
                  id="new_password"
                />
                <label
                  htmlFor="new_password"
                  className="floating__label"
                  data-content="NOVA SENHA"
                >
                  <span className="hidden--visually"></span>
                </label>
                <div className="form-error">
                  {errors.new_password && touched.new_password ? (
                    <div>{errors.new_password}</div>
                  ) : null}
                </div>
              </div>

              <div className="field floating">
                <Field
                  placeholder="Placeholder"
                  className="floating__input"
                  name="confirm_password"
                  type="password"
                  id="confirm_password"
                />
                <label
                  htmlFor="confirm_password"
                  className="floating__label"
                  data-content="CONFIRMAR SENHA"
                >
                  <span className="hidden--visually"></span>
                </label>
                <div className="form-error">
                  {errors.confirm_password && touched.confirm_password ? (
                    <div>{errors.confirm_password}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-button flip">
                <button type="submit" className={`btn text-${theme[1]}`}>
                  Criar Nova Senha
                </button>
              </div>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </>
  );
}
