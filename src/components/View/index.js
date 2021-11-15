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
import { DangerButton, ButtonsWrapper, SuccessButton } from "../Buttons";
import Popup from "../Popup";

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  margin: 0 2rem;
  padding-bottom: 4rem;
`;

const Main = styled.main`
  padding: 0 5.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const YawaraWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;

const Rest = styled.div`
  margin-top: 23px;
  grid-column: span 8;
`;

const PicWrapper = styled.div`
  grid-column: span 1;
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
`;

const ImgWrapper = styled(Wrapper)`
  width: 80%;
  height: 25rem;
  border-radius: 14px;
  margin: 1rem 0;
  overflow: hidden;
  margin-top: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`;

const StyledImageEditorHistory = styled(ImageEditorHistory)`
  height: 20rem;
  section {
    width: 60%;
  }
`;

TimeAgo.addDefaultLocale(pt);

const timeAgo = new TimeAgo("pt-BR");
export default function View() {
  const [showPopup, setShowPopup] = useState(false);
  const theme = useTheme(false, true)[0][1];
  const [selected, setSelected] = useState(fakeData);
  const [reply, setReply] = useState(false);
  const [left, setLeft] = useState(0);
  const [bottom, setBottom] = useState(0);
  let { id } = useParams();
  useTitle(selected.title);

  const handleDelete = (e) => {
    const pos = e.target.getBoundingClientRect();
    setBottom(pos.bottom);
    setLeft(pos.left);
    setShowPopup(true);
  };

  return (
    <Content>
      <Title justify="space-between" title={selected.title}>
        <span>Criado por: {selected.creator}</span>
        <span>{selected.creation_date}</span>
      </Title>
      <Main>
        {selected.history.map((yawara, index) => (
          <YawaraWrapper key={index}>
            <PicWrapper>
              <Pic>
                {yawara.profilePic ? (
                  <img src={yawara.profilePic} alt={yawara.author} />
                ) : (
                  <UserIcon />
                )}
              </Pic>
              {selected.history.length !== index + 1 || reply === true ? (
                <Border></Border>
              ) : null}
            </PicWrapper>
            <Rest>
              <Wrapper>
                <InfoWrapper>
                  <AuthorName>{yawara.author}</AuthorName>
                  <Time>{timeAgo.format(new Date(...yawara.time))}</Time>
                </InfoWrapper>
              </Wrapper>
              <Wrapper>
                <ImgWrapper>
                  <img
                    src={yawara.image}
                    alt={`${selected.title} - ${yawara.author}`}
                  />
                </ImgWrapper>
              </Wrapper>
              <OptionsWrapper>
                <span
                  className="view-icons"
                  style={{
                    color:
                      yawara.didInteract[1] === 0
                        ? "var(--blue-xs)"
                        : "var(--green)",
                  }}
                >
                  <AiFillLike
                    style={{
                      fill:
                        yawara.didInteract[1] === 0
                          ? "var(--blue-xs)"
                          : "var(--green)",
                    }}
                  />
                  {yawara.likes}
                </span>

                <span
                  className="view-icons"
                  style={{
                    color:
                      yawara.didInteract[1] === 1
                        ? "var(--red-xs)"
                        : "var(--green)",
                  }}
                >
                  <AiFillDislike
                    style={{
                      fill:
                        yawara.didInteract[1] === 1
                          ? "var(--red-xs)"
                          : "var(--green)",
                    }}
                  />
                  {yawara.dislikes}
                </span>
                {selected.user_type === "creator" && index !== 0 && (
                  <span
                    className="view-icons"
                    onClick={(e) => {
                      handleDelete(e);
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
                    <Time>agora</Time>
                  </InfoWrapper>
                </Wrapper>
                <StyledImageEditorHistory width={80}></StyledImageEditorHistory>
              </Rest>
            </YawaraWrapper>

            <StyledButtonsWrapper>
              <div className="form-button flip" onClick={() => setReply(true)}>
                <div className={`btn text-${theme}`}>Publicar História</div>
              </div>
              <div className="form-button flip" onClick={() => setReply(false)}>
                <div className={`btn text-${theme}`}>Cancelar</div>
              </div>
            </StyledButtonsWrapper>
          </>
        )}

        {!reply && (
          <StyledButtonsWrapper>
            {(selected.participation === "public" ||
              selected.user_type === "creator") && (
              <div className="form-button flip" onClick={() => setReply(true)}>
                <div className={`btn text-${theme}`}>Continuar História</div>
              </div>
            )}

            {selected.user_type === "creator" && (
              <>
                <div className="form-button flip">
                  <button
                    to="/explore"
                    className={`btn text-${theme}`}
                    type="submit"
                  >
                    {selected.participation === "public"
                      ? "Fechar colaboração"
                      : "Abrir colaboração"}
                  </button>
                </div>

                <div className="form-button flip">
                  <button className={`btn text-${theme}`} type="submit">
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
            width="20rem"
            svgMarginLeft="12rem"
            setPopup={setShowPopup}
          >
            <StyledH4>Realmente Deseja Excluir?</StyledH4>
            <ButtonsWrapper theme={theme}>
              <DangerButton>Sim</DangerButton>
              <SuccessButton>Não</SuccessButton>
            </ButtonsWrapper>
          </Popup>
        )}
      </Main>
    </Content>
  );
}
