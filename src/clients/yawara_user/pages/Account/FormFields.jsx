import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik"
import { Link } from "react-router-dom";
import * as Yup from 'yup';

function FormFields({ action, theme }) {
  const required = "É necessário preencher este campo";
  const [formSchema, setFormSchema] = useState({
    email: Yup.string()
      .email('É necessário preencher com um email válido')
      .required(required),
    password: Yup.string()
      .min(4, 'Senha pequena')
      .required(required),
  });

  useEffect(() => {
    if (action === "Criar Conta") {
      setFormSchema({
        ...formSchema,
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Senhas não são iguais')
          .min(4, 'Senha pequena')
          .required(required),
      })
    }
  }, [action])

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={Yup.object().shape(formSchema)}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="field floating">
            <Field placeholder="Placeholder" className="floating__input" name="email" type="email" id="email" />
            <label for="email" className="floating__label" data-content="Email">
              <span className="hidden--visually"></span>
            </label>
          </div>
          <div className="form-error">
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
          </div>

          <div className="field floating">
            <Field placeholder="Placeholder" className="floating__input" type="password" name="password" id="password" />
            <label for="password" className="floating__label" data-content="Senha">
              <span className="hidden--visually"></span>
            </label>
          </div>
          <div className="form-error">
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </div>
          {action === 'Criar Conta' &&
            <>
              <div className="field floating">
                <Field placeholder="Placeholder" className="floating__input" type="password" name="passwordConfirmation" id="passwordConfirmation" />
                <label for="passwordConfirmation" className="floating__label" data-content="Confirmar Senha">
                  <span className="hidden--visually"></span>
                </label>
              </div>
              <div className="form-error">
                {errors.passwordConfirmation && touched.passwordConfirmation ? <div>{errors.passwordConfirmation}</div> : null}
              </div>
            </>
          }


          <div className="form-button flip">
            <Link to="/explore" className={`btn text-${theme}`} type="submit">{action}</Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormFields;