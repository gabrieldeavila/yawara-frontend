import Title from '../../../../components/Title'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ImageEditorHistory from '../../../../components/ImageEditor'
import styled from 'styled-components'
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from '../../../../components/Styled/Tags'
import useTheme from '../../../../states/Theme'
import { useState } from 'react'
import useTitle from '../../../../states/Title'
import { Name, Wrapper } from '../../../../components/Forms'

const StyledTagsToSelect = styled(TagsToSelect)`
  margin-top: 0;
`

const Select = styled.select`
  outline: none;
  background: var(--green);
  border: none;
  font-weight: 600;
  border-radius: 7px;
  width: 25%;
  padding-left: 0.3rem;
  font-size: 14px;
  color: ${(props) =>
    props.theme === 'dark' ? 'var(--black)' : 'var(--white)'};
`

export default function NewHistory() {
  const [tags, setTags] = useState([
    [0, 'Animais', true],
    [1, 'Felinos', false],
    [2, 'Cães', true],
    [3, 'Árvores', false],
    [4, 'Criptmoedas', false],
    [5, 'Bitcoin', false],
    [6, 'Polkamarkets', false],
    [7, 'Polkadot', false],
    [8, 'Curve Finance', false],
  ])

  const required = 'É necessário preencher este campo'
  const [theme] = useTheme(false, true)

  useTitle('Nova História')
  return (
    <Wrapper>
      <Title
        title="Nova História"
        description="Crie uma nova história e compartilhe imagens com outras pessoas"
      />
      <Formik
        initialValues={{
          name: '',
          tags: [],
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(required),
          tags: Yup.array().min(
            1,
            'Select atleast one option of your interest',
          ),
        })}
        onSubmit={(values) => {
          console.log(values)
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
              <ImageEditorHistory></ImageEditorHistory>
              <div className="form-error">
                {errors.tags && touched.tags ? <div>{errors.tags}</div> : null}
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
                      value={tag[0]}
                      onChange={() => {
                        let newTag = tag.map((t) => t)
                        newTag[2] = !tag[2]

                        let newTags = tags.map((t, i) => {
                          if (i === index) return newTag
                          return t
                        })
                        setTags(newTags)
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
                {errors.tags && touched.tags ? <div>{errors.tags}</div> : null}
              </div>
            </div>
            <div className="field floating">
              <Name>Participação</Name>
              <Select theme={theme[1]}>
                <option value={0}>Pública</option>
                <option value={1}>Privada</option>
              </Select>
              <div className="form-error">
                {errors.tags && touched.tags ? <div>{errors.tags}</div> : null}
              </div>
            </div>
            <div className="form-button flip">
              <button
                className={`btn text-${theme[1] === 'dark' ? 'dark' : 'light'}`}
                type="submit"
              >
                Criar História!
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
