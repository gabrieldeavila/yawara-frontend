import { useParams } from "react-router";
import TimeAgo from "javascript-time-ago";
import pt from "javascript-time-ago/locale/pt.json";
import { fakeData } from "./fakeData";
import styled from "styled-components";
import { useState } from "react";
import Title from "../Title";
import { FaUserAlt, AiFillLike, AiFillDislike } from "react-icons/all";
import { IoMdTrash } from "react-icons/io";
import useTitle from "../../states/Title";
import usePosition from "../../states/Position";
import { useRef } from "react";

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
  width: 508px;
  height: 310px;
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

TimeAgo.addDefaultLocale(pt);

const timeAgo = new TimeAgo("pt-BR");
export default function View() {
  const [selected, setSelected] = useState(fakeData);
  const [yawaraToDelete, setYawaraToDelete] = useState([]);
  let { id } = useParams();
  console.log("bruh");
  useTitle(selected.title);

  const handleDelete = (e) => {
    console.log(e);
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
              {selected.history.length !== index + 1 && <Border></Border>}
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
                {selected.user_type === "creator" && (
                  <span
                    className="view-icons"
                    onClick={() => {
                      handleDelete();
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
      </Main>
    </Content>
  );
}
