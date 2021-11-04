import { Logo, StyledWrapper } from "../../../../components/Decoration";
import Title from "../../../../components/Title";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import useTheme from "../../../../states/Theme";
import { Link } from "react-router-dom";

export default function PasswordReset() {
  const [theme] = useTheme(false, true);

  const StyledForm = styled(Form)`
    width: 100%;
  `;

  const required = "É necessário preencher este campo";
  return (
    <>
      <Logo />
      <Title title="Recuperação de Senha" />
      <StyledWrapper items="start" justify="start" direction="column">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            new_password: "",
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
                <Link
                  to="/account"
                  className={`btn text-${theme[1]}`}
                  type="submit"
                >
                  Criar Nova Senha
                </Link>
              </div>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </>
  );
}
