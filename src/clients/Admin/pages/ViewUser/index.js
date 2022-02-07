import { AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router";
import { Wrapper } from "../../../../components/Forms";
import { useState, useEffect, useContext } from "react";
import { FaUserAlt } from "react-icons/all";
import {
  ButtonsWrapper,
  DangerButton,
  SuccessButton,
} from "../../../../components/Buttons";
import useTheme from "../../../../states/Theme";
import styled from "styled-components";
import Modal from "../../../../components/Modal";
import TimeAgo from "javascript-time-ago";
import pt from "javascript-time-ago/locale/pt.json";
import _ from "lodash";
import Popup from "../../../../components/Popup";
import axios from "axios";
import { Context } from "../../../../Contexts/GlobalContext";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const StyledButtonsWrapper = styled(ButtonsWrapper)`
  margin-top: 0;
`;

const StyledH4 = styled.h4`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: ${(props) =>
    props.theme === "dark" ? "var(--black)" : "var(--white)"};
`;

const User = styled(FaUserAlt)`
  fill: var(--green);
  transform: scale(1.5);
`;

const H2 = styled.h2`
  color: var(--green);
`;

TimeAgo.addDefaultLocale(pt);

const timeAgo = new TimeAgo("pt-BR");

export default function ViewUser() {
  const { id } = useParams();
  const { bearerToken, defaultURL } = useContext(Context);

  const [theme] = useTheme(false, true);
  const [user, setUser] = useState({});
  const [deleteHistory, setDeleteHistory] = useState({});
  const [modal, setModal] = useState(false);
  const [left, setLeft] = useState(0);
  const [bottom, setBottom] = useState(0);
  const history = useHistory();

  const handleDelete = (e, hist) => {
    const pos = e.getBoundingClientRect();
    setBottom(pos.bottom);
    setLeft(pos.left);
    setDeleteHistory(hist);
  };

  const destroyUser = () => {
    axios({
      method: "delete",
      url: defaultURL + "api/admin/destroy-user/" + user.id,
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        // history.push("/admin/select");
        toast.success(`Usuário deletado com sucesso`, {
          className:
            theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
        });
        history.push("/admin/select-user");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(async () => {
    await axios({
      method: "get",
      url: defaultURL + "api/admin/view/" + id,
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        console.log(response);
        setUser(response.data.success);
      })
      .catch((err) => {
        console.log(err, "erro?");
      });
  }, []);

  const handleDeleteHist = (e, hist) => {
    axios({
      method: "delete",
      url: defaultURL + "api/admin/delete-history/" + deleteHistory.id,
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        let keep = user.histories.filter((h) => h.id !== deleteHistory.id);
        setUser({ ...user, histories: keep });
        setDeleteHistory({});
      })
      .catch((err) => {});
  };

  return (
    <Wrapper>
      <div className="admin-view-header">
        <div className="admin-view-header-user">
          {user.image ? (
            <img
              className="admin-view-header-user_img"
              src={defaultURL + "storage/" + user.image}
            />
          ) : (
            <User />
          )}
          <h3 className="admin-view-header-user_name">{user.nickname}</h3>
        </div>
        <StyledButtonsWrapper theme={theme[1]}>
          <DangerButton onClick={() => setModal(true)}>
            Deletar Conta
          </DangerButton>
        </StyledButtonsWrapper>
      </div>
      <div className="admin-view-sub_header">
        <p>Criado em: {user.creation_date}</p>
        <p>Última edição em: {user.last_update}</p>
      </div>
      <div className="admin-view-content">
        <h2>Histórias</h2>
        <div className="admin-view-content-histories-wrapper">
          {user?.histories?.length === 0 && <H2>Nenhuma história publicada</H2>}
          {user?.histories?.map((hist, i) => (
            <div className="history">
              <div className="history-header">
                <h3>{hist.name}</h3>
                <p>Data de publicação: {hist.creation_date}</p>
              </div>
              <div className="history-image">
                <img src={defaultURL + "storage/" + hist.image} />
              </div>
              <div className="history-buttons">
                <span>Likes: {hist.likes}</span>
                <AiFillDelete
                  onClick={(e) => {
                    handleDelete(e.target, hist);
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
          title={`Realmente deseja excluir o perfil de ${user.nickname}? `}
          setModal={setModal}
        >
          <div className="modal-view-history">
            <p>O usuário perderá sua conta, bem como todas as suas histórias</p>
            <ButtonsWrapper theme={theme[1]}>
              <DangerButton onClick={destroyUser}>Sim</DangerButton>
              <SuccessButton onClick={() => setModal(false)}>Não</SuccessButton>
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
            <DangerButton onClick={handleDeleteHist}>Sim</DangerButton>
            <SuccessButton
              onClick={() => {
                setDeleteHistory();
              }}
            >
              Não
            </SuccessButton>
          </ButtonsWrapper>
        </Popup>
      )}
    </Wrapper>
  );
}
