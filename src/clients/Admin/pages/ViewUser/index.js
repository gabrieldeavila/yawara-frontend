import { AiFillDelete } from 'react-icons/ai'
import { useParams } from 'react-router'
import { Wrapper } from '../../../../components/Forms'
import { useState, useEffect } from 'react'
import {
  ButtonsWrapper,
  DangerButton,
  SuccessButton,
} from '../../../../components/Buttons'
import useTheme from '../../../../states/Theme'
import styled from 'styled-components'
import Modal from '../../../../components/Modal'
import TimeAgo from 'javascript-time-ago'
import pt from 'javascript-time-ago/locale/pt.json'
import _ from 'lodash'
import Popup from '../../../../components/Popup'

const StyledButtonsWrapper = styled(ButtonsWrapper)`
  margin-top: 0;
`
const StyledH4 = styled.h4`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: ${(props) =>
    props.theme === 'dark' ? 'var(--black)' : 'var(--white)'};
`
TimeAgo.addDefaultLocale(pt)
const timeAgo = new TimeAgo('pt-BR')

export default function ViewUser() {
  const { id: userId } = useParams()

  const [theme] = useTheme(false, true)
  const [user, setUser] = useState({})
  const [deleteHistory, setDeleteHistory] = useState({})
  const [modal, setModal] = useState(false)
  const [left, setLeft] = useState(0)
  const [bottom, setBottom] = useState(0)

  const handleDelete = (e, hist) => {
    const pos = e.getBoundingClientRect()
    setBottom(pos.bottom)
    setLeft(pos.left)
    setDeleteHistory(hist)
  }

  useEffect(() => {
    setUser({
      id: 1,
      name: 'Rick Astley',
      profile_picture: 'https://avatars.githubusercontent.com/u/76487489?v=4',
      creation_date: '20/11/2021',
      last_login: [2021, 7, 13, 19, 55, 45],

      histories: [
        {
          id: 0,
          title: 'Gatos Mais Estranhos do Mundo',
          creator: 'John Doe',
          creation_date: '11/08/2021',
          likes: 1000,
          dislikes: 100,
          image:
            'https://images.unsplash.com/photo-1637019838019-5f14d84ee308?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80',
        },
        {
          id: 0,
          title: 'Gatos Mais Estranhos do Mundo',
          creator: 'John Doe',
          creation_date: '11/08/2021',
          likes: 1000,
          dislikes: 100,
          image:
            'https://m.extra.globo.com/incoming/6919755-eb9-1d8/w488h275-PROP/gato-batman-1.jpg',
        },
      ],
    })
  }, [])
  return (
    <Wrapper>
      <div className="admin-view-header">
        <div className="admin-view-header-user">
          <img
            className="admin-view-header-user_img"
            src={user.profile_picture}
          />
          <h3 className="admin-view-header-user_name">{user.name}</h3>
        </div>
        <StyledButtonsWrapper theme={theme[1]}>
          <DangerButton onClick={() => setModal(true)}>
            Deletar Conta
          </DangerButton>
        </StyledButtonsWrapper>
      </div>
      <div className="admin-view-sub_header">
        <p>{user.creation_date}</p>
        <p>{user.last_login && timeAgo.format(new Date(...user.last_login))}</p>
      </div>
      <div className="admin-view-content">
        <h2>Histórias</h2>
        <div className="admin-view-content-histories-wrapper">
          {user?.histories?.map((hist, i) => (
            <div className="history">
              <div className="history-header">
                <h3>{hist.title}</h3>
                <p>Data de publicação: {hist.creation_date}</p>
              </div>
              <div className="history-image">
                <img src={hist.image} />
              </div>
              <div className="history-buttons">
                <span>Likes: {hist.likes}</span>
                <AiFillDelete
                  onClick={(e) => {
                    handleDelete(e.target, hist)
                  }}
                  className="history-buttons-delete trans-1"
                />
                <span>Deslikes: {hist.dislikes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <Modal
          theme={theme[1]}
          title={`Realmente deseja excluir o perfil de ${user.name} `}
          setModal={setModal}
        >
          <div className="modal-view-history">
            <p>O usuário perderá sua conta, bem como todas as suas histórias</p>
            <ButtonsWrapper theme={theme[1]}>
              <DangerButton onClick={() => setModal(true)}>Sim</DangerButton>
              <SuccessButton onClick={() => setModal(true)}>Não</SuccessButton>
            </ButtonsWrapper>
          </div>
        </Modal>
      )}
      {!_.isEmpty(deleteHistory) && (
        <Popup
          width="15rem"
          bottom={bottom}
          left={left + 65}
          svgMarginLeft="8rem"
          setPopup={setDeleteHistory}
          colorVar="green"
        >
          <StyledH4 theme={theme[1]}>Realmente Deseja Excluir?</StyledH4>
          <ButtonsWrapper theme={theme[1]}>
            <DangerButton>Sim</DangerButton>
            <SuccessButton>Não</SuccessButton>
          </ButtonsWrapper>
        </Popup>
      )}
    </Wrapper>
  )
}
