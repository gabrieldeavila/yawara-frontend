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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import _ from "lodash";
import { useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../../../../Contexts/GlobalContext";
import { ProfilePlaceholder } from "../../../../components/Placeholders";

export default function Profile() {
  useTitle("Perfil");

  const [currUserImage, setCurrUserImage] = useState(null);
  const [theme] = useTheme(false, true);
  const [tags, setTags] = useState([]);
  const { bearerToken, reload, setReload } = useContext(Context);

  const imageRef = useRef();

  const [nickname, setNickname] = useState("Rick Astley");
  const [user, setUser] = useState({});
  const [password_, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/profile",
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        setIsReady(true);
        setUser(response.data.success.user);
        setCurrUserImage(response.data.success.img);
        setTags(response.data.success.tags);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Wrapper>
      <Title title="Configurar Perfil" description="Altere suas preferências" />
      {isReady ? (
        <Formik
          initialValues={{
            nickName: user?.nickname,
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            nickName: Yup.string().required("Você deve ter um apelido!"),
          })}
          onSubmit={async (values) => {
            let selected_tags = _.filter(tags, function (o) {
              return o.selected;
            });

            if (password_.length < 4 && password_.length > 0) {
              toast.error("Senha não pode ter menos que 4 caracteres!", {
                className:
                  theme[1] === "light"
                    ? "toast-theme--light"
                    : "toast-theme--dark",
              });
            } else if (password_ !== passwordConfirm) {
              toast.error("Senhas não conferem!", {
                className:
                  theme[1] === "light"
                    ? "toast-theme--light"
                    : "toast-theme--dark",
              });
            } else {
              setPassword("");
              await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/profile",
                data: {
                  tags: selected_tags,
                  nickname: values.nickName,
                  password: password_,
                  img: imageRef.current.returnImage(),
                },
                headers: { Authorization: `Bearer ${bearerToken}` },
              })
                .then((response) => {
                  setReload(!reload);
                })
                .catch((err) => {
                  console.log(err.response);
                });
              setPasswordConfirm("");
              toast.success("Perfil atualizado com sucesso!", {
                className:
                  theme[1] === "light"
                    ? "toast-theme--light"
                    : "toast-theme--dark",
              });
            }
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
                  {errors.nickName && nickname === "" ? (
                    <div>{errors.nickName}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <Name>Imagem de Perfil</Name>
                <ImageEditorHistory
                  ref={imageRef}
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
                  value={password_}
                  onChange={(e) => setPassword(e.target.value)}
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
              {password_.length > 0 && (
                <div className="field floating">
                  <Field
                    placeholder="Placeholder"
                    className="floating__input"
                    name="password-confirm"
                    type="password"
                    id="password-confirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <label
                    htmlFor="password-confirm"
                    className="floating__label"
                    data-content="CONFIRMAÇÃO DE SENHA"
                  >
                    <span className="hidden--visually"></span>
                  </label>
                </div>
              )}
              <div>
                <Name>Tags Preferidas</Name>
                <TagsToSelect>
                  {tags.map((tag, index) => (
                    <Label key={index} htmlFor={index}>
                      <Field
                        type="checkbox"
                        id={index}
                        name="tags"
                        className="input"
                        value={tag.name}
                        onChange={() => {
                          let newTag = tag;
                          newTag.selected = !tag.selected;

                          let newTags = tags.map((t, i) => {
                            if (i === index) return newTag;
                            return t;
                          });

                          setTags(newTags);
                        }}
                        checked={tag.selected ?? false}
                      />
                      <CheckSpan dontChange={true} theme={theme[1]}>
                        <Icon viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </Icon>
                      </CheckSpan>
                      <span>{tag.name}</span>
                    </Label>
                  ))}
                </TagsToSelect>
              </div>

              <div className="form-button flip">
                <button
                  className={`btn text-${
                    theme[1] === "dark" ? "dark" : "light"
                  }`}
                  type="submit"
                >
                  Salvar Alterações
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <ProfilePlaceholder />
        </>
      )}
    </Wrapper>
  );
}
