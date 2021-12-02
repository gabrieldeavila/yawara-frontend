import React from 'react'
import Modal from '../../../../components/Modal'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'

export default function ModalAcc({ theme, setModal }) {
  const formSchema = {
    email: Yup.string()
      .email('É necessário preencher com um email válido')
      .required('Você tem que preencher este campo'),
  }

  return (
    <Modal
      setModal={setModal}
      theme={theme}
      title={
        'Digite o  seu endereço de email para receber um link de recuperação'
      }
    >
      <div className="form">
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Yup.object().shape(formSchema)}
          onSubmit={(email) => {
            console.log(email)
            toast.success(`Email de recuperação enviado para ${email.email}`, {
              className:
                theme[1] === 'light'
                  ? 'toast-theme--light'
                  : 'toast-theme--dark',
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <ToastContainer />

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
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
              <div className="form-button flip">
                <button className={`btn text-${theme}`} type="submit">
                  Enviar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}
