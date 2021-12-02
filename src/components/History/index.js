import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollStyled = styled(InfiniteScroll)`
  display: flex;
  margin: 0 2rem;
  margin-top: 4rem;
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem 6rem;
  justify-content: center;
  align-items: center;
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
      padding: 0;
    }
  }
`;

const H2 = styled.h2`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: var(--green);
  width: 36rem;
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

export default function History({
  histories,
  moreData,
  hasMore,
  shouldDelete,
}) {
  const fetchMoreData = () => {
    moreData();
  };

  return (
    <InfiniteScrollStyled
      dataLength={histories.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<H2>Carregando...</H2>}
      endMessage={<H2>Todas as histórias foram atingidas :/</H2>}
    >
      {histories.map((his, index) => (
        <HistoryWrapper key={index} to={`/view/${his.id}`}>
          <H2>{his.title}</H2>
          <Infos>
            <span className="header_info">Criado por: {his.creator}</span>
            <span className="header_info">{his.creation_date}</span>
          </Infos>
          <ImageWrapper>
            <Image src={his.image} />
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
