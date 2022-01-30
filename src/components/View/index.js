import { useParams } from "react-router";
import TimeAgo from "javascript-time-ago";
import pt from "javascript-time-ago/locale/pt.json";
import { fakeData } from "./fakeData";
import styled from "styled-components";
import { useState } from "react";
import Title from "../Title";
import { FaUserAlt, AiFillLike, AiFillDislike } from "react-icons/all";
import { IoMdTrash } from "react-icons/io";
import ImageEditorHistory from "../ImageEditor";
import useTitle from "../../states/Title";
import useTheme from "../../states/Theme/index";
import {
  DangerButton,
  ButtonsWrapper,
  SuccessButton,
  NormalButton,
} from "../Buttons";
import Popup from "../Popup";
import Modal from "../Modal";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Context } from "../../Contexts/GlobalContext";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import _ from "lodash";

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 426px) {
    & .form-button {
      width: 100%;

      & .btn {
        width: 100%;
        text-align: center;
      }
    }
  }
`;

const Content = styled.div`
  margin: 0 2rem;
  padding-bottom: 4rem;
  display: flex;
  flex-wrap: wrap;
`;

const ModalContent = styled.div`
  margin-top: 1rem;
`;

const Main = styled.main`
  padding: 0 5.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  @media (max-width: 990px) {
    padding: 0;
  }
`;

const YawaraWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;

const Rest = styled.div`
  margin-top: 23px;
  grid-column: span 8;
  @media (max-width: 430px) {
    grid-column: span 9;
  }
`;

const PicWrapper = styled.div`
  grid-column: span 1;
  @media (max-width: 430px) {
    display: none;
  }
`;

const Border = styled.div`
  width: 5px;
  height: 100%;
  margin-left: 2rem;
  background: var(--blue);
  box-shadow: 1px 0px 15px 0px #00000087;
`;

const Pic = styled.div`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 9px var(--blue);

  img {
    overflow: hidden;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  svg {
    width: 50%;
    height: 50%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 2rem;
  justify-content: center;

  span {
    color: var(--green);
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  span svg {
    margin-right: 0.5rem;
    fill: var(--green);
    transform: scale(1.25);
  }
`;

const InfoWrapper = styled(Wrapper)`
  justify-content: space-between;
  width: 100%;
  @media (max-width: 430px) {
    grid-area: name;
  }
`;

const ImgWrapper = styled(Wrapper)`
  width: 35rem;
  height: 35rem;
  border-radius: 14px;
  margin: 1rem 0;
  overflow: hidden;
  margin-top: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 990px) {
    width: 25rem;
    height: 25rem;
  }
  @media (max-width: 990px) {
    grid-area: image;
  }
`;

const UserIcon = styled(FaUserAlt)`
  fill: var(--green);
`;

const AuthorName = styled.span`
  color: var(--green);
  font-weight: 600;
`;

const Time = styled.span`
  color: var(--green);
  @media (max-width: 990px) {
    .mobile-time {
      margin-bottom: 2rem;
    }
  }
`;

const OptionsWrapper = styled(Wrapper)`
  cursor: pointer;
  span {
    transition: 0.15s ease all;
  }
  span:hover {
    transform: scale(1.15);
  }
`;

const StyledH4 = styled.h4`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: ${(props) =>
    props.theme === "dark" ? "var(--black)" : "var(--white)"};
`;

const StyledImageEditorHistory = styled(ImageEditorHistory)`
  height: 20rem;
  section {
    width: 60%;
  }
`;

TimeAgo.addLocale(pt);

const timeAgo = new TimeAgo("pt-BR");
export default function View() {
  const history = useHistory();

  const { bearerToken, defaultURL } = useContext(Context);

  const [deleteHistory, setDeleteHistory] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const theme = useTheme(false, true)[0][1];
  const [selected, setSelected] = useState(fakeData);
  const [reply, setReply] = useState(false);
  const [left, setLeft] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [deleteImage, setDeleteImage] = useState({});
  const imageRef = useRef();

  let { id } = useParams();
  useTitle(selected.title);

  useEffect(() => {
    axios({
      method: "get",
      url: defaultURL + "api/view/" + id,
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        // console.log(response.data.success, "OI?");
        setSelected(response.data.success);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleDelete = (e, img) => {
    const pos = e.target.getBoundingClientRect();
    setBottom(pos.bottom);
    setLeft(pos.left);
    setShowPopup(true);
    setDeleteImage(img);
  };

  const handleInteraction = async (what, hist) => {
    await axios({
      method: "post",
      url: defaultURL + "api/interaction",
      data: {
        interaction: what === "like" ? 1 : 0,
        history_answer_id: selected.id,
        history_answer_history_id: hist.id,
        image_id: hist.image_id,
        creator_id: hist.user_id,
      },
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        let updatedAnswer = response.data.success;
        let newAnswers = selected.answers.map((answer) =>
          answer.id === hist.id ? updatedAnswer : answer
        );
        setSelected({ ...selected, answers: newAnswers });
      })
      .catch((err) => console.log(err.response));
  };

  const newHistory = async () => {
    let img = imageRef.current.returnImage();
    if (_.isUndefined(img)) {
      toast.error("Selecione uma imagem!", {
        className:
          theme[1] === "light" ? "toast-theme--light" : "toast-theme--dark",
      });
      return;
    }
    await axios({
      method: "post",
      url: defaultURL + "api/history/answer",
      data: {
        img: img,
        history_id: selected.id,
      },
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        console.log(response);
        axios({
          method: "get",
          url: defaultURL + "api/view/" + id,
          headers: { Authorization: `Bearer ${bearerToken}` },
        })
          .then((response) => {
            // console.log(response.data.success, "OI?");
            setSelected(response.data.success);
          })
          .catch((err) => console.log(err.response));

        setReply(false);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <Content>
      <ToastContainer />

      <Title justify="space-between" title={selected.title}>
        <span>Criado por: {selected.author}</span>
        <span>{selected.time_ago}</span>
      </Title>
      <Main>
        {selected.answers?.map((answer, index) => (
          <YawaraWrapper key={index}>
            <PicWrapper>
              <Pic>
                {answer.profilePic ? (
                  <img
                    src={defaultURL + "storage/" + answer.profilePic}
                    alt={answer.author}
                  />
                ) : (
                  <UserIcon />
                )}
              </Pic>
              {selected.answers.length !== index + 1 || reply === true ? (
                <Border></Border>
              ) : null}
            </PicWrapper>
            <Rest>
              <Wrapper>
                <InfoWrapper>
                  <AuthorName>{answer.author}</AuthorName>

                  <Time>{answer.time_ago}</Time>
                </InfoWrapper>
              </Wrapper>
              <Wrapper>
                <ImgWrapper>
                  <img
                    src={defaultURL + "storage/" + answer.image}
                    alt={`${selected.title} - ${answer.author}`}
                  />
                </ImgWrapper>
              </Wrapper>
              <OptionsWrapper>
                <span
                  className="view-icons"
                  style={{
                    color:
                      answer?.didInteract && parseInt(answer.interaction)
                        ? "var(--blue-xs)"
                        : "var(--green)",
                  }}
                  onClick={() => handleInteraction("like", answer)}
                >
                  <AiFillLike
                    style={{
                      fill:
                        answer?.didInteract && parseInt(answer.interaction)
                          ? "var(--blue-xs)"
                          : "var(--green)",
                    }}
                  />
                  {answer.likes}
                </span>

                <span
                  className="view-icons"
                  style={{
                    color:
                      answer?.didInteract && !parseInt(answer.interaction)
                        ? "var(--red-xs)"
                        : "var(--green)",
                  }}
                  onClick={() => handleInteraction("dislike", answer)}
                >
                  <AiFillDislike
                    style={{
                      fill:
                        answer?.didInteract && !parseInt(answer.interaction)
                          ? "var(--red-xs)"
                          : "var(--green)",
                    }}
                  />
                  {answer.dislikes}
                </span>
                {selected.user_type === "creator" && index !== 0 && (
                  <span
                    className="view-icons"
                    onClick={(e) => {
                      handleDelete(e, answer);
                    }}
                  >
                    <IoMdTrash
                      style={{
                        fill: "var(--red)",
                      }}
                    />
                  </span>
                )}
              </OptionsWrapper>
            </Rest>
          </YawaraWrapper>
        ))}
        {reply && (
          <>
            <YawaraWrapper>
              <PicWrapper>
                <Pic>
                  {selected.profilePic ? (
                    <img src={selected.profilePic} alt={selected.user_name} />
                  ) : (
                    <UserIcon />
                  )}
                </Pic>
              </PicWrapper>
              <Rest>
                <Wrapper>
                  <InfoWrapper>
                    <AuthorName>{selected.userName}</AuthorName>
                    <Time>
                      <span className="mobile-time">agora</span>
                    </Time>
                  </InfoWrapper>
                </Wrapper>
                <StyledImageEditorHistory
                  ref={imageRef}
                  width={80}
                ></StyledImageEditorHistory>
              </Rest>
            </YawaraWrapper>

            <StyledButtonsWrapper theme={theme}>
              <div className="form-button flip" onClick={newHistory}>
                <div className={`btn text-${theme}`}>Publicar Continuação</div>
              </div>
              <div className="form-button flip" onClick={() => setReply(false)}>
                <div className={`btn text-${theme}`}>Cancelar</div>
              </div>
            </StyledButtonsWrapper>
          </>
        )}

        {!reply && (
          <StyledButtonsWrapper>
            {(selected.public || selected.is_creator) && (
              <div className="form-button flip" onClick={() => setReply(true)}>
                <div className={`btn text-${theme}`}>Continuar História</div>
              </div>
            )}

            {selected.is_creator && (
              <>
                <div className="form-button flip">
                  <button
                    to="/explore"
                    className={`btn text-${theme}`}
                    type="submit"
                    onClick={() =>
                      setSelected({
                        ...selected,
                        public: selected.public ? "private" : "public",
                      })
                    }
                  >
                    {selected.public
                      ? "Fechar colaboração"
                      : "Abrir colaboração"}
                  </button>
                </div>
                <div className="form-button flip">
                  <button
                    className={`btn text-${theme}`}
                    onClick={() => setDeleteHistory(true)}
                    type="submit"
                  >
                    Deletar História
                  </button>
                </div>
              </>
            )}
          </StyledButtonsWrapper>
        )}
        {showPopup && (
          <Popup
            bottom={bottom}
            left={left}
            colorVar={"green"}
            colorClose={theme === "light" ? "white" : "black"}
            width="20rem"
            svgMarginLeft="12rem"
            setPopup={setShowPopup}
          >
            <StyledH4 theme={theme}>Realmente Deseja Excluir?</StyledH4>
            <ButtonsWrapper theme={theme}>
              <DangerButton
                onClick={() => {
                  let keepHistories = [];
                  selected.history.forEach((hist, index) => {
                    if (hist.id !== deleteImage.id) {
                      keepHistories.push(hist);
                    }
                  });
                  setSelected({ ...selected, history: keepHistories });
                  toast.success("Imagem excluída com sucesso da história!", {
                    className:
                      theme === "light"
                        ? "toast-theme--light"
                        : "toast-theme--dark",
                  });
                }}
              >
                Sim
              </DangerButton>
              <SuccessButton onClick={() => setShowPopup(false)}>
                Não
              </SuccessButton>
            </ButtonsWrapper>
          </Popup>
        )}

        {deleteHistory && (
          <Modal
            setModal={setDeleteHistory}
            theme={theme}
            titlePosition={"left"}
            title={"Deletar toda essa história?"}
          >
            <ModalContent>
              <p>Uma vez que essa ação é realizada, não pode ser desfeita.</p>
              <ButtonsWrapper theme={theme}>
                <DangerButton onClick={() => history.push("/explore")}>
                  Sim, quero deletar
                </DangerButton>
                <SuccessButton onClick={() => setDeleteHistory(false)}>
                  Opa, melhor não
                </SuccessButton>
              </ButtonsWrapper>
            </ModalContent>
          </Modal>
        )}
      </Main>
    </Content>
  );
}
