import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";
import { useState } from "react";
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from "../../../../components/Styled/Tags";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useTheme from "../../../../states/Theme";
import { Name } from "../../../../components/Forms";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import _ from "lodash";

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

const StyledTagsToSelect = styled(TagsToSelect)``;

const StyledIcon = styled(Icon)`
  path {
    stroke: var(--red);
    stroke-width: 0;
  }
`;

export default function TagsManagement() {
  const [theme] = useTheme(false, true);
  const [tags, setTags] = useState([
    [0, "Animais", false],
    [1, "Felinos", false],
    [2, "Cães", false],
    [3, "Árvores", false],
    [4, "Criptmoedas", false],
    [5, "Bitcoin", false],
    [6, "Polkamarkets", false],
    [7, "Polkadot", false],
    [8, "Curve Finance", false],
    [9, "Cachorros", false],
  ]);

  const onTagChange = (e, tag) => {
    let newTag = tag.map((v) => v);
    newTag[1] = e.target.value;
    newTag[4] = "changed";
    setTags(
      tags.map((tag_n) => {
        if (tag_n[0] === newTag[0]) {
          return newTag;
        }
        return tag_n;
      })
    );
  };

  const deleteTags = () => {
    let keep_tags = _.filter(tags, function (o) {
      return o[2] === false;
    });
    if (keep_tags.length === tags.length) {
      toast.warn("Não há tags para deletar", {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      });
    } else if (keep_tags.length === 0) {
      toast.error("Não é possível deletar todas as tags", {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
        position: "top-right",
      });
    } else {
      toast.success(`${tags.length - keep_tags.length} tag(s) removida(s)!`, {
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
      setTags(keep_tags);
    }
  };

  const saveTags = () => {
    let changed_tags = _.filter(tags, function (o) {
      return o[4] === "changed";
    });

    let filter_tags = tags.map((tag) => {
      if (tag.length === 5) {
        let new_tag = [tag[0], tag[1], tag[2]];
        return new_tag;
      }
      return tag;
    });

    setTags(filter_tags);
    if (changed_tags.length > 0)
      toast.success(`${changed_tags.length} tag(s) alterada(s)!`, {
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
    else
      toast.warn(`Nenhuma tag alterada!`, {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      });
    console.log(changed_tags);
  };

  useTitle("Gerenciar Tags");
  return (
    <Wrapper>
      <ToastContainer />
      <Title
        title={"Gerenciar Tags"}
        description={"Crie, edite ou exclua tags de pesquisa"}
      />
      <Formik
        initialValues={{
          new_tag: "",
        }}
        validationSchema={Yup.object().shape({
          new_tag: Yup.string().required("Você precisa preencher este campo"),
        })}
        onSubmit={(values) => {
          setTags([...tags, [tags.length, values.new_tag, false]]);
          // fazer envio para o banco e colocar toast
          toast.success(`Tag Adicionada: ${values.new_tag}`, {
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
                      value={tag[1]}
                    />
                  </Label>
                ))}
              </StyledTagsToSelect>

              <div className="form-error">
                {errors.tags && touched.tags ? <div>{errors.tags}</div> : null}
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
                className={`btn text-${theme[1] === "dark" ? "dark" : "light"}`}
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
                className={`btn text-${theme[1] === "dark" ? "dark" : "light"}`}
                type="nothing"
                onClick={saveTags}
              >
                Salvar Alterações
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
