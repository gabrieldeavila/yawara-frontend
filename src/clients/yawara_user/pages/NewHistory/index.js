import Title from "../../../../components/Title";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ImageEditorHistory from "../../../../components/ImageEditor";
import styled from "styled-components";
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from "../../../../components/Styled/Tags";
import useTheme from "../../../../states/Theme";
import { useState, useContext, useRef, useEffect } from "react";
import useTitle from "../../../../states/Title";
import { Name, Wrapper } from "../../../../components/Forms";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import _ from "lodash";
import axios from "axios";
import { Context } from "../../../../Contexts/GlobalContext";
import { useHistory } from "react-router-dom";
import { NewHistoryPlaceholder } from "../../../../components/Placeholders";

const StyledTagsToSelect = styled(TagsToSelect)`
  margin-top: 0;
`;

const Select = styled.select`
  outline: none;
  background: var(--green);
  border: none;
  font-weight: 600;
  border-radius: 7px;
  width: 100%;
  padding-left: 0.3rem;
  font-size: 14px;
  color: ${(props) =>
    props.theme === "dark" ? "var(--black)" : "var(--white)"};
`;

export default function NewHistory() {
  const [tags, setTags] = useState([]);
  const [select, setSelect] = useState(true);
  const { bearerToken, reload, setReload } = useContext(Context);
  const [isReady, setIsReady] = useState(false);
  const imageRef = useRef();
  const [creatingHistory, setCreatingHistory] = useState(false);

  useEffect(async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/tags",
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        setTags(response.data.tags);
        setIsReady(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const required = "É necessário preencher este campo";
  const [theme] = useTheme(false, true);

  const [returnImage, setReturnImage] = useState(null);
  const [imageField, setImageField] = useState();

  const history = useHistory();

  useTitle("Nova História");
  return (
    <Wrapper>
      <Title
        title="Nova História"
        description="Crie uma nova história e compartilhe imagens com outras pessoas"
      />
      {isReady ? (
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required(required)
              .min(4, "Muito curto")
              .max(40, "Muito longo"),
          })}
          onSubmit={async (values) => {
            if (creatingHistory) return;
            let selected_tags = _.filter(tags, function (o) {
              return o.selected;
            });
            const img = imageRef.current.returnImage();
            if (_.isEmpty(img)) {
              toast.error("Selecione uma imagem!", {
                className:
                  theme[1] === "light"
                    ? "toast-theme--light"
                    : "toast-theme--dark",
              });
            } else {
              setCreatingHistory(true);
              await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/new-history",
                data: {
                  name: values.name,
                  tags: selected_tags,
                  img: imageRef.current.returnImage(),
                  public: select,
                },
                headers: { Authorization: `Bearer ${bearerToken}` },
              })
                .then((response) => {
                  console.log(response);
                  toast.success("História criada com sucesso!", {
                    className:
                      theme[1] === "light"
                        ? "toast-theme--light"
                        : "toast-theme--dark",
                  });
                  history.push("/view/" + response.data.success.id);
                  console.log(response);
                })
                .catch((err) => {
                  console.log(err.response);
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
                  name="name"
                  type="text"
                  id="name"
                />
                <label
                  htmlFor="name"
                  className="floating__label"
                  data-content="NOME"
                >
                  <span className="hidden--visually"></span>
                </label>
              </div>
              <div className="form-error">
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
              </div>
              <div className="field floating">
                <Name>Imagem</Name>
                <ImageEditorHistory
                  ref={imageRef}
                  setImageField={setImageField}
                ></ImageEditorHistory>
                <div className="form-error">
                  {errors.tags && touched.tags ? (
                    <div>{errors.tags}</div>
                  ) : null}
                </div>
              </div>

              <div className="tags">
                <Name>Tags de pesquisa</Name>
                <StyledTagsToSelect>
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
                </StyledTagsToSelect>

                <div className="form-error">
                  {errors.tags && touched.tags ? (
                    <div>{errors.tags}</div>
                  ) : null}
                </div>
              </div>
              <div className="field floating">
                <Name>Participação</Name>
                <Select
                  onChange={(e) =>
                    setSelect(e.target.value === "true" ? true : false)
                  }
                  theme={theme[1]}
                >
                  <option value={true}>Pública</option>
                  <option value={false}>Privada</option>
                </Select>
                <div className="form-error">
                  {errors.tags && touched.tags ? (
                    <div>{errors.tags}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-button flip">
                <button
                  className={`btn text-${
                    theme[1] === "dark" ? "dark" : "light"
                  }`}
                  type="submit"
                >
                  {creatingHistory ? "Criando história.." : "Criar História!"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <NewHistoryPlaceholder />
        </>
      )}
    </Wrapper>
  );
}
