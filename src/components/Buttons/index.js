import styled from "styled-components";

const Button = styled.button`
  padding: 1rem;
  border-radius: 7px;
  cursor: pointer;
  border: none;
  font-weight: 600;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  button {
    transition: 0.5s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: ${(props) =>
      props.theme === "light" ? "var(--white)" : "var(--black)"};
  }
  button::after {
    content: "";
    position: absolute;
    z-index: -1;
    transform: rotate(10deg) skewX(100deg);
    border-radius: 7px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: 0.5s ease;
  }
  button:hover::after {
    transform: rotate(0deg) skewX(0deg);
    background: var(--yellow);
  }
  button:hover {
    transform: scale(1.05);
  }
`;

export const DangerButton = styled(Button)`
  background: var(--light-red);
`;

export const SuccessButton = styled(Button)`
  background: var(--light-green);
`;

export const NormalButton = styled(Button)`
  background: var(--green);
  color: var(--yellow) !important;
  & :hover::after {
    background: var(--black) !important;
  }
`;
