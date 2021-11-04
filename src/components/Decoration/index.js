import { ReactComponent as Tail } from "../../assets/img/tail.svg";
import styled from "styled-components";

export const H1 = styled.h1`
  font-weight: 600;
  color: var(--yellow);
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.items ? props.items : "center")};
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 2rem;
  margin-bottom: 2rem;
`;

export const Logo = () => {
  return (
    <H1>
      <StyledWrapper>
        <Tail />
        Yawara
      </StyledWrapper>
    </H1>
  );
};
