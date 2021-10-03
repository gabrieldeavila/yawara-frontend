import styled from "styled-components";

const Content = styled.div`
  display: flex;

  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const H1 = styled.h1`
  font-weight: 600;
  color: var(--green);
  font-size: 22px;
`;

const Description = styled.div`
  font-size: 14px;
  color: var(--green);
  margin-top: 0.5rem;
`;

export default function Title({ title, description }) {
  return (
    <Content>
      <H1>{title}</H1>
      <Description>{description}</Description>
    </Content>
  );
}
