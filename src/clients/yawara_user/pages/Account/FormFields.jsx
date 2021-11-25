import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import * as Yup from 'yup'
import { HiDesktopComputer } from 'react-icons/hi'

function FormFields({ action, theme }) {
  const required = 'É necessário preencher este campo'
  const history = useHistory()
  const [formSchema, setFormSchema] = useState({
    email: Yup.string()
      .email('É necessário preencher com um email válido')
      .required(required),
    password: Yup.string().min(4, 'Senha pequena').required(required),
  })

  useEffect(() => {
    if (action === 'Criar Conta') {
      setFormSchema({
        ...formSchema,
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Senhas não são iguais')
          .min(4, 'Senha pequena')
          .required(required),
      })
    } else {
      if (_.has(formSchema, 'passwordConfirmation')) {
        setFormSchema(_.unset(formSchema, 'passwordConfirmation'))
        console.log(formSchema)
      }
    }
  }, [action])

  return (
    <Formik
      initialValues={{
        password: '',
        email: '',
        passwordConfirmation: '',
      }}
      validationSchema={Yup.object().shape(formSchema)}
      onSubmit={(values) => {
        if (window.location.pathname.split('/')[1] === 'admin') {
          history.push('tags-management')
        } else if (action === 'Entrar') {
          history.push('/explore')
        } else {
          history.push('/finish-register')
        }
      }}
    >
      {({ errors, touched }) => (
        <Form autoComplete="off">
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
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>

          <div className="field floating">
            <Field
              placeholder="Placeholder"
              className="floating__input"
              type="password"
              name="password"
              id="password"
            />
            <label
              htmlFor="password"
              className="floating__label"
              data-content="Senha"
            >
              <span className="hidden--visually"></span>
            </label>
          </div>
          <div className="form-error">
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </div>
          {action === 'Criar Conta' && (
            <>
              <div className="field floating">
                <Field
                  placeholder="Placeholder"
                  className="floating__input"
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                />
                <label
                  htmlFor="passwordConfirmation"
                  className="floating__label"
                  data-content="Confirmar Senha"
                >
                  <span className="hidden--visually"></span>
                </label>
              </div>
              <div className="form-error">
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <div>{errors.passwordConfirmation}</div>
                ) : null}
              </div>
            </>
          )}

          <div className="form-button flip">
            <button className={`btn text-${theme}`} type="submit">
              {action}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormFields
