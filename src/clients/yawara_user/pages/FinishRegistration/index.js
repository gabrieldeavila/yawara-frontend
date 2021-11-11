import styled from "styled-components";
import { useState } from "react";
import { Logo, StyledWrapper } from "../../../../components/Decoration";
import Title from "../../../../components/Title";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Wrapper, Name } from "../../../../components/Forms";
import * as Yup from "yup";
import ImageEditorHistory from "../../../../components/ImageEditor";
import { fakeImg } from "../Profile/fakeImg";
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from "../../../../components/Styled/Tags";
import useTheme from "../../../../states/Theme";

const StyledTagsToSelect = styled(TagsToSelect)`
  display: grid;
  margin-top: 0;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

export default function FinishRegistration() {
  const required = "É necessário preencher este campo";
  const [tags, setTags] = useState([
    [0, "Animais", true],
    [1, "Felinos", false],
    [2, "Cães", true],
    [3, "Árvores", false],
    [4, "Criptmoedas", false],
    [5, "Bitcoin", false],
    [6, "Polkamarkets", false],
    [7, "Polkadot", false],
    [8, "Curve Finance", false],
  ]);
  const [theme] = useTheme(false, true);

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
                <ImageEditorHistory></ImageEditorHistory>
              </div>

              <div className="tags">
                <Name>Tags Preferidas</Name>
                <StyledTagsToSelect>
                  {tags.map((tag, index) => (
                    <Label key={index} htmlFor={index}>
                      <Field
                        type="checkbox"
                        id={index}
                        name="tags"
                        className="input"
                        value={tag[0]}
                        onChange={() => {
                          let newTag = tag.map((t) => t);
                          newTag[2] = !tag[2];

                          let newTags = tags.map((t, i) => {
                            if (i === index) return newTag;
                            return t;
                          });
                          setTags(newTags);
                        }}
                        checked={tag[2]}
                      />
                      <CheckSpan dontChange={true} theme={theme[1]}>
                        <Icon viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </Icon>
                      </CheckSpan>
                      <span>{tag[1]}</span>
                    </Label>
                  ))}
                </StyledTagsToSelect>

                <div className="form-error">
                  {errors.tags && touched.tags ? (
                    <div>{errors.tags}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-button flip">
                <Link
                  to="/explore"
                  className={`btn text-${theme[1]}`}
                  type="submit"
                >
                  Finalizar Cadastro
                </Link>
              </div>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </>
  );
}
