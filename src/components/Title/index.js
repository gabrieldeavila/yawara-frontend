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

const ExtraInfo = styled(Description)`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
`;

export default function Title({ title, description, children, justify }) {
  return (
    <Content>
      <H1>{title}</H1>
      {description ? (
        <Description>{description}</Description>
      ) : (
        <ExtraInfo justify={justify}>{children}</ExtraInfo>
      )}
    </Content>
  );
}
