import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

import TimeAgo from "javascript-time-ago";
import pt from "javascript-time-ago/locale/pt.json";
import { useContext } from "react";
import { Context } from "../../Contexts/GlobalContext";
import { HistoriesPlaceholder } from "../Placeholders";

const InfiniteScrollStyled = styled(InfiniteScroll)`
  display: flex;
  margin: 0 2rem;
  margin-top: 4rem;
  padding-bottom: 20rem;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem 6rem;
  justify-content: center;
  align-items: center;
  overflow: visible !important;
`;

const HistoryWrapper = styled(Link)`
  display: flex;
  transition: 0.25s all;
  flex-direction: column;
  width: 36rem;
  gap: 1rem;
  padding: 1rem;
  border-radius: 14px;
  &:hover {
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    transform: scale(1.05);
  }
  @media (max-width: 800px) {
    & {
      width: 100%;
    }
  }
`;

const H2 = styled.h2`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: var(--green);
  width: 36rem;
  @media (max-width: 900px) {
    & {
      width: 100%;
      padding: 0;
    }
  }
`;

const Infos = styled.div`
  font-weight: 600;
  color: var(--green);
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.justify ? props.justify : "space-between"};
  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  @media (max-width: 800px) {
    .header_info {
      display: none;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 14px;
  overflow: hidden;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

TimeAgo.addLocale(pt);

const timeAgo = new TimeAgo("pt-BR");

export default function History({
  histories,
  moreData,
  hasMore,
  shouldDelete,
}) {
  const { defaultURL } = useContext(Context);

  const fetchMoreData = () => {
    moreData();
  };

  return (
    <InfiniteScrollStyled
      dataLength={histories.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <H2>
          <HistoriesPlaceholder />
        </H2>
      }
      endMessage={
        <H2>
          {histories.length > 0
            ? "Todas as histórias foram atingidas 😞"
            : "Nenhuma história para mostrar 🥲 "}
        </H2>
      }
      scrollThreshold={0.0}
    >
      {histories.map((his, index) => (
        <HistoryWrapper key={index} to={`/view/${his.id}`}>
          {console.log(his)}
          <H2>{his.name}</H2>
          <Infos>
            <span className="header_info">Criado por: {his.nickname}</span>
            <span className="header_info">{his.time_ago}</span>
          </Infos>
          <ImageWrapper>
            <Image src={`${defaultURL}storage/${his.path}`} />
          </ImageWrapper>
          <Infos justify="space-evenly">
            <span>
              {his.likes}
              <AiFillLike />
            </span>
            <span>
              {his.dislikes}
              <AiFillDislike />
            </span>
          </Infos>
        </HistoryWrapper>
      ))}
    </InfiniteScrollStyled>
  );
}
