import styled from "styled-components";
import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Wrapper, Name } from "../../../../components/Forms";
import ImageEditorHistory from "../../../../components/ImageEditor";
import { fakeImg } from "./fakeImg";
import { useState } from "react";
import useTheme from "../../../../states/Theme";
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from "../../../../components/Styled/Tags";
const StyledTagsToSelect = styled(TagsToSelect)`
  display: grid;
  margin-top: 0;
  grid-template-columns: repeat(4, 1fr);
`;
export default function Profile() {
  useTitle("Perfil");

  const currUserImage = fakeImg;
  const [theme] = useTheme(false, true);
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
  return (
    <Wrapper>
      <Title title="Configurar Perfil" description="Altere suas preferências" />
      <Formik
        initialValues={{
          nickName: "",
        }}
        validationSchema={Yup.object().shape({
          nickName: Yup.string().required("Você deve ter um apelido!"),
          tags: Yup.array().min(
            1,
            "Select atleast one option of your interest"
          ),
          password: Yup.string().min(
            4,
            "Senha deve ter mínimo de 4 caracteres"
          ),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <div className="field floating">
              <Field
                placeholder="Placeholder"
                className="floating__input"
                name="nickName"
                type="text"
                id="nickName"
              />
              <label
                htmlFor="nickName"
                className="floating__label"
                data-content="APELIDO"
              >
                <span className="hidden--visually"></span>
              </label>
              <div className="form-error">
                {errors.nickName && touched.nickName ? (
                  <div>{errors.nickName}</div>
                ) : null}
              </div>
            </div>
            <div>
              <Name>Imagem de Perfil</Name>
              <ImageEditorHistory
                defaultImage={currUserImage}
              ></ImageEditorHistory>
            </div>
            <div className="field floating">
              <Field
                placeholder="Placeholder"
                className="floating__input"
                name="password"
                type="password"
                id="password"
              />
              <label
                htmlFor="password"
                className="floating__label"
                data-content="SENHA"
              >
                <span className="hidden--visually"></span>
              </label>
              <div className="form-error">
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>
            </div>
            <div>
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
            </div>

            <div className="form-button flip">
              <button
                className={`btn text-${theme[1] === "dark" ? "dark" : "light"}`}
                type="submit"
              >
                Salvar Alterações
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
