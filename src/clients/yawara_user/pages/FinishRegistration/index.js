import styled from "styled-components";
import { Logo, StyledWrapper } from "../../../../components/Decoration";
import Title from "../../../../components/Title";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Wrapper, Name } from "../../../../components/Forms";
import * as Yup from "yup";
import ImageEditorHistory from "../../../../components/ImageEditor";
import { fakeImg } from "../Profile/fakeImg";

const StyledForm = styled(Form)`
  width: 100%;
`;

export default function FinishRegistration() {
  const required = "É necessário preencher este campo";

  return (
    <>
      <Logo />
      <StyledWrapper items="start" justify="start" direction="column">
        <Title
          title="Configurar Perfil"
          description="Últimos passos para completar a criação de conta "
          marginTop="1.5rem"
        />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("É necessário preencher com um email válido")
              .required(required),
            password: Yup.string().min(4, "Senha pequena").required(required),
          })}
        >
          {({ errors, touched }) => (
            <StyledForm autoComplete="off">
              <div className="field floating">
                <Field
                  placeholder="Placeholder"
                  className="floating__input"
                  name="email"
                  type="email"
                  id="email"
                />
                <label
                  htmlFor="email"
                  className="floating__label"
                  data-content="Email"
                >
                  <span className="hidden--visually"></span>
                </label>
              </div>
              <div className="form-error">
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div>
                <Name>Imagem de Perfil</Name>
                {/* <ImageEditorHistory */}
                <ImageEditorHistory defaultImage={fakeImg}></ImageEditorHistory>
              </div>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </>
  );
}
