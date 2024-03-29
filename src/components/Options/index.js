import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillSetting, IoExit, MdDeleteSweep } from "react-icons/all";
import Modal from "../Modal";
import { useState } from "react";
import { DangerButton, ButtonsWrapper, SuccessButton } from "../Buttons";
import { Context } from "../../Contexts/GlobalContext";
import { useContext, useEffect } from "react";
import axios from "axios";

const Content = styled.div`
  user-select: none;
  padding-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const H3 = styled.div`
  font-weight: 600;
  color: ${(props) =>
    props.theme === "light" ? `var(--white)` : `var(--black)`};
  cursor: pointer;
`;

const SuperAiFillSetting = styled(AiFillSetting)`
  fill: ${(props) =>
    props.theme === "light" ? `var(--white)` : `var(--black)`};
`;

const SuperIoExit = styled(IoExit)`
  fill: ${(props) =>
    props.theme === "light" ? `var(--white)` : `var(--black)`};
`;

const SuperMdDeleteSweep = styled(MdDeleteSweep)`
  fill: ${(props) =>
    props.theme === "light" ? `var(--white)` : `var(--black)`};
`;

const SuperLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  &:hover ${SuperAiFillSetting}, &:hover ${SuperIoExit}, &:hover ${H3} {
    fill: var(--blue-xs);
    color: var(--blue-xs);
  }
  ${SuperAiFillSetting}, ${SuperIoExit}, ${H3} {
    transition: all 0.25s ease;
  }
`;

const Exit = styled.button`
  display: flex;
  border: none;
  background: none;
  font-size: 1rem;
  gap: 0.5rem;
  margin-left: -0.2rem;
  cursor: pointer;
  &:hover ${SuperAiFillSetting}, &:hover ${SuperIoExit}, &:hover ${H3} {
    fill: var(--blue-xs);
    color: var(--blue-xs);
  }
  ${SuperAiFillSetting}, ${SuperIoExit}, ${H3} {
    transition: all 0.25s ease;
  }
`;

const ChangeTheme = styled.div`
  display: flex;
  cursor: pointer;
  gap: 0.5rem;
  &:hover svg,
  &:hover ${H3} {
    fill: var(--blue-xs);
    color: var(--blue-xs);
  }
  svg,
  ${H3} {
    transition: all 0.25s ease;
  }
  svg {
    fill: ${(props) =>
      props.theme === "light" ? `var(--white)` : `var(--black)`};
  }
`;

const DeleteAccount = styled.div`
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  &:hover ${SuperMdDeleteSweep}, &:hover ${H3} {
    transition: all 0.25s ease;
    fill: var(--blue-xs);
    color: var(--blue-xs);
  }
  ${SuperMdDeleteSweep}, ${H3} {
    transition: all 0.25s ease;
  }
`;

const ModalContent = styled.div`
  margin-top: 3rem;
`;

export default function Options({ setPopup, theme, type }) {
  const [theme_option, changeCookie] = theme;
  const [svg, theme_title] = theme_option;
  const [modal, setModal] = useState(false);
  const { setBearerToken, bearerToken, defaultURL, user } = useContext(Context);

  const deleteAccount = () => {
    axios({
      method: "delete",
      url: `${defaultURL}api/users/delete/${user.id}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then(() => {
        setBearerToken(null);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Content>
      {type === "client" && (
        <SuperLink onClick={() => setPopup(false)} to="/profile">
          <SuperAiFillSetting theme={theme_title} />
          <H3 theme={theme_title}>Configurar Perfil</H3>
        </SuperLink>
      )}

      <Exit
        // onClick={() => setPopup(false)}
        onClick={() => {
          setBearerToken("");
          window.location.reload();
        }}
      >
        <SuperIoExit theme={theme_title} />
        <H3 theme={theme_title}>Sair</H3>
      </Exit>

      <ChangeTheme theme={theme_title} onClick={() => changeCookie()}>
        {svg}
        {/* {theme === "light" ? "light" : "dark"} */}
        <H3 theme={theme_title}>Mudar Tema</H3>
      </ChangeTheme>

      {type === "client" && (
        <>
          <DeleteAccount onClick={(e) => setModal(true)}>
            <SuperMdDeleteSweep theme={theme_title} />
            <H3 theme={theme_title}>Deletar Conta</H3>
          </DeleteAccount>
          {modal && (
            <Modal
              setModal={setModal}
              theme={theme_title}
              titlePosition={"left"}
              title={"Deletar conta e todas as suas informações?"}
            >
              <ModalContent>
                Você realmente deseja deletar a sua conta e perder todas as suas
                histórias? Saiba que uma vez realizada essa ação não pode ser
                revertida!
                <ButtonsWrapper theme={theme_title}>
                  <DangerButton onClick={deleteAccount}>
                    Sim, quero deletar
                  </DangerButton>
                  <SuccessButton onClick={() => setModal(false)}>
                    Não, foi um engano
                  </SuccessButton>
                </ButtonsWrapper>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </Content>
  );
}
