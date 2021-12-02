import styled from "styled-components";
import { useState } from "react";
import { Logo, StyledWrapper } from "../../../../components/Decoration";
import Title from "../../../../components/Title";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Wrapper, Name } from "../../../../components/Forms";
import * as Yup from "yup";
import ImageEditorHistory from "../../../../components/ImageEditor";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from "../../../../components/Styled/Tags";
import useTheme from "../../../../states/Theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const StyledTagsToSelect = styled(TagsToSelect)``;

const StyledForm = styled(Form)`
  width: 100%;
`;

export default function FinishRegistration() {
  const history = useHistory();

  const required = "É necessário preencher este campo";
  const [tags, setTags] = useState([
    [0, "Animais"],
    [1, "Felinos"],
    [2, "Cães"],
    [3, "Árvores"],
    [4, "Criptmoedas"],
    [5, "Bitcoin"],
    [6, "Polkamarkets"],
    [7, "Polkadot"],
    [8, "Curve Finance"],
    [9, "Cachorros"],
    [10, "Pássaros"],
    [11, "Peixes"],
  ]);

  const [theme] = useTheme(false, true);

  const showError = (label) => {
    toast.error(label, {
      className:
        theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer />
      <Logo />
      <StyledWrapper items="start" justify="start" direction="column">
        <Title
          title="Configurar Perfil"
          description="Últimos passos para completar a criação de conta "
          marginTop="1.5rem"
        />
        <Formik
          initialValues={{
            nickname: "",
          }}
          validationSchema={Yup.object().shape({
            nickname: Yup.string()
              .min(2, "2 caracteres é o mínimo")
              .max(60, "60 caracteres é o máximo")
              .required(required),
          })}
          onSubmit={(values) => {
            // verificar se tem, ao menos, uma tag
            const selectedTags = _.filter(tags, function (o) {
              return o[2];
            });

            if (selectedTags.length < 1) {
              showError("Selecione pelo menos uma tag!");
            } else {
              history.push("/explore");
            }
          }}
        >
          {({ errors, touched }) => (
            <StyledForm autoComplete="off">
              <div className="field floating">
                <Field
                  placeholder="Placeholder"
                  className="floating__input"
                  name="nickname"
                  type="text"
                  id="nickname"
                />
                <label
                  htmlFor="nickname"
                  className="floating__label"
                  data-content="APELIDO"
                >
                  <span className="hidden--visually"></span>
                </label>
              </div>
              <div className="form-error">
                {errors.nickname && touched.nickname ? (
                  <div>{errors.nickname}</div>
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
                <button className={`btn text-${theme[1]}`} type="submit">
                  Finalizar Cadastro
                </button>
              </div>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </>
  );
}
