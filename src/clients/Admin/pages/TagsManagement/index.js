import Title from '../../../../components/Title'
import useTitle from '../../../../states/Title'
import { useState } from 'react'
import {
  CheckSpan,
  TagsToSelect,
  Label,
  Icon,
} from '../../../../components/Styled/Tags'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import useTheme from '../../../../states/Theme'
import { Name } from '../../../../components/Forms'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 2rem;
`

const StyledTagsToSelect = styled(TagsToSelect)`
  display: grid;
  margin-top: 0;
  grid-template-columns: repeat(4, 1fr);
`

const StyledIcon = styled(Icon)`
  path {
    stroke: var(--red);
    stroke-width: 0;
  }
`

export default function TagsManagement() {
  const [theme] = useTheme(false, true)
  const [tags, setTags] = useState([
    [0, 'Animais', false],
    [1, 'Felinos', false],
    [2, 'Cães', false],
    [3, 'Árvores', false],
    [4, 'Criptmoedas', false],
    [5, 'Bitcoin', false],
    [6, 'Polkamarkets', false],
    [7, 'Polkadot', false],
    [8, 'Curve Finance', false],
  ])

  useTitle('Gerenciar Tags')
  return (
    <Wrapper>
      <Title
        title={'Gerenciar Tags'}
        description={'Crie, edite ou exclua tags de pesquisa'}
      />
      <Formik
        initialValues={{
          new_tag: '',
          tags: [],
        }}
        validationSchema={Yup.object().shape({
          new_tag: Yup.string().required('Você precisa preencher este campo'),
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
                      <StyledIcon viewBox="0 0 9 9">
                        <path
                          d="M8.29232 1.472L7.52857 0.708252L4.50065 3.73617L1.47273 0.708252L0.708984 1.472L3.7369 4.49992L0.708984 7.52784L1.47273 8.29159L4.50065 5.26367L7.52857 8.29159L8.29232 7.52784L5.2644 4.49992L8.29232 1.472Z"
                          fill="#C98A7D"
                        />
                      </StyledIcon>
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
                className={`btn text-${theme[1] === 'dark' ? 'dark' : 'light'}`}
                type="submit"
              >
                Adicionar Tag
              </button>
              <button
                className={`btn btn-danger text-${
                  theme[1] === 'dark' ? 'dark' : 'light'
                }`}
                type="submit"
              >
                Deletar Tags
              </button>

              <button
                className={`btn text-${theme[1] === 'dark' ? 'dark' : 'light'}`}
                type="submit"
              >
                Salvar Alterações
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
