import styled from "styled-components";
import { Link } from "react-router-dom";

const Content = styled.div`
  display: flex;
  margin: 0 2rem;
  margin-top: 4rem;
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
`;

const H2 = styled.h2`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: var(--green);
`;

const Infos = styled.div`
  font-weight: 600;
  color: var(--green);
  display: flex;
  justify-content: space-between;
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

export default function History({ histories }) {
  return (
    <Content>
      {histories.map((his) => (
        <HistoryWrapper to={`/view/${his.id}`}>
          <H2>{his.title}</H2>
          <Infos>
            <span>Criado por: {his.creator}</span>
            <span>{his.creation_date}</span>
          </Infos>
          <ImageWrapper>
            <Image src={his.image} />
          </ImageWrapper>
        </HistoryWrapper>
      ))}
    </Content>
  );
}
