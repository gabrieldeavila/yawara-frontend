import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";
import { useState, useContext, useEffect } from "react";
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from "../../../../components/Styled/Tags";
import { Context } from "../../../../Contexts/GlobalContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useTheme from "../../../../states/Theme";
import { Name } from "../../../../components/Forms";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import _ from "lodash";
import axios from "axios";
import ReactPlaceholder from "react-placeholder";
import { TagsButtonsPlaceholder } from "../../../../components/Placeholders";
import "react-placeholder/lib/reactPlaceholder.css";

const Wrapper = styled.div`
  margin: 0 2rem;
  .input-search-tags {
    display: flex;
    color: var(--green);
    background: none;
    border: none;
    outline: none;
    font-weight: 600;
    font-size: 15px;
  }
`;

const StyledTagsToSelect = styled(TagsToSelect)`
  ${Label} {
    overflow: hidden;
  }
`;

const StyledIcon = styled(Icon)`
  path {
    stroke: var(--red);
    stroke-width: 0;
  }
`;

export default function TagsManagement() {
  const { bearerToken } = useContext(Context);

  const [theme] = useTheme(false, true);
  const [tags, setTags] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/admin/tags",
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then(function (response) {
        setTags(response.data.tags);
        setIsReady(true);
      })
      .catch((error) => {
        console.log(error.response, error, bearerToken, "a");
      });
  }, []);

  const onTagChange = (e, tag) => {
    let newTag = { ...tag };

    newTag.name = e.target.value;
    newTag.changed = true;

    setTags(
      tags.map((tag_n) => {
        if (tag_n.id === newTag.id) {
          return newTag;
        }
        return tag_n;
      })
    );
  };

  const deleteTags = async () => {
    let delete_tags = _.filter(tags, function (o) {
      return o.selected === true;
    });
    let keep_tags = _.filter(tags, function (o) {
      return o.selected !== true;
    });

    if (delete_tags.length === 0) {
      toast.warn("Não há tags para deletar", {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      });
    } else if (delete_tags.length === tags.length) {
      toast.error("Não é possível deletar todas as tags", {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
        position: "top-right",
      });
    } else {
      // selecionando apenas o id
      delete_tags = delete_tags.map((tag) => tag.id);

      await axios({
        method: "delete",
        url: "http://127.0.0.1:8000/api/admin/tags",
        data: delete_tags,
        headers: { Authorization: `Bearer ${bearerToken}` },
      })
        .then(function (response) {
          toast.success(response.data.success, {
            className:
              theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
          });
          setTags(keep_tags);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const saveTags = async () => {
    let changed_tags = _.filter(tags, function (o) {
      return o.changed === true;
    });

    if (changed_tags.length > 0) {
      let filter_tags = tags.map((tag) => {
        if (tag.changed) {
          let new_tag = { ...tag };
          new_tag.changed = false;
          return new_tag;
        }
        return tag;
      });

      setTags(filter_tags);

      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/admin/tags/edit",
        data: changed_tags,
        headers: { Authorization: `Bearer ${bearerToken}` },
      })
        .then(function (response) {
          toast.success(response.data.success, {
            className:
              theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else
      toast.warn(`Nenhuma tag para ser alterada!`, {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      });
  };

  useTitle("Gerenciar Tags");
  return (
    <Wrapper>
      <ToastContainer />
      <Title
        title={"Gerenciar Tags"}
        description={"Crie, edite ou exclua tags de pesquisa"}
      />
      <ReactPlaceholder
        ready={isReady}
        customPlaceholder={<TagsButtonsPlaceholder />}
      >
        <Formik
          initialValues={{
            new_tag: "",
          }}
          validationSchema={Yup.object().shape({
            new_tag: Yup.string().required(
              "Você precisa preencher este campo para adicionar uma tag"
            ),
          })}
          onSubmit={async (values) => {
            // fazer envio para o banco e colocar toast
            axios({
              method: "post",
              url: "http://127.0.0.1:8000/api/admin/tags",
              data: { name: values.new_tag },
              headers: { Authorization: `Bearer ${bearerToken}` },
            })
              .then(function (response) {
                toast.success(`Tag Adicionada: ${values.new_tag}`, {
                  className:
                    theme[1] === "light"
                      ? "toast-theme--light"
                      : "toast-theme--dark",
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                values.new_tag = "";
                setTags([...tags, response.data.tag]);
              })
              .catch(() => {
                toast.error(
                  `Algum erro aconteceu, tente novamente mais tarde`,
                  {
                    className:
                      theme[1] === "light"
                        ? "toast-theme--light"
                        : "toast-theme--dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              });
          }}
        >
          {({ errors, touched }) => (
            <Form autoComplete="off">
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
                        value={tag.id}
                        onChange={() => {
                          let newTag = tag;
                          newTag.selected = !tag.selected;

                          let newTags = tags.map((t, i) => {
                            if (i === index) return newTag;
                            return t;
                          });

                          setTags(newTags);
                        }}
                        checked={tag.selected}
                      />
                      <CheckSpan dontChange={true} theme={theme[1]}>
                        <StyledIcon viewBox="0 0 9 9">
                          <path
                            d="M8.29232 1.472L7.52857 0.708252L4.50065 3.73617L1.47273 0.708252L0.708984 1.472L3.7369 4.49992L0.708984 7.52784L1.47273 8.29159L4.50065 5.26367L7.52857 8.29159L8.29232 7.52784L5.2644 4.49992L8.29232 1.472Z"
                            fill="#C98A7D"
                          />
                        </StyledIcon>
                      </CheckSpan>
                      <input
                        className="input-search-tags"
                        onChange={(e) => onTagChange(e, tag)}
                        value={tag.name}
                      />
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
                <Field
                  placeholder="Placeholder"
                  className="floating__input"
                  name="new_tag"
                  type="text"
                  id="new_tag"
                />
                <label
                  htmlFor="new_tag"
                  className="floating__label"
                  data-content="NOVA TAG"
                >
                  <span className="hidden--visually"></span>
                </label>
              </div>
              <div className="form-error">
                {errors.new_tag && touched.new_tag ? (
                  <div>{errors.new_tag}</div>
                ) : null}
              </div>
              <div className="form-button form-button-multiple flip">
                <button
                  className={`btn text-${
                    theme[1] === "dark" ? "dark" : "light"
                  }`}
                  type="submit"
                >
                  Adicionar Tag
                </button>
                <div
                  className={`btn btn-danger text-${
                    theme[1] === "dark" ? "dark" : "light"
                  }`}
                  type="nothing"
                  onClick={deleteTags}
                >
                  Deletar Tags
                </div>

                <div
                  className={`btn text-${
                    theme[1] === "dark" ? "dark" : "light"
                  }`}
                  type="nothing"
                  onClick={saveTags}
                >
                  Salvar Alterações
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </ReactPlaceholder>
    </Wrapper>
  );
}
