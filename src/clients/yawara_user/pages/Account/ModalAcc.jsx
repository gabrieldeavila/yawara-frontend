import React from "react";
import Modal from "../../../../components/Modal";
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';

export default function ModalAcc({ theme, setModal }) {
  const formSchema = {
    email: Yup.string()
      .email('É necessário preencher com um email válido')
      .required("Você tem que preencher este campo")
  };

  return <Modal setModal={setModal} theme={theme} title={'Digite o  seu endereço de email para receber um link de recuperação'}>
    <div className="form">
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

          </Form>
        )}
      </Formik>
      <div className="form-button flip">
        <button className={`btn text-${theme}`} type="submit">Enviar</button>
      </div>
    </div>
  </Modal>
}