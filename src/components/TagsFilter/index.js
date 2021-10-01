import styled from "styled-components";
import useTheme from "../../states/Theme";
import { ButtonsWrapper, NormalButton } from "../Buttons";

const Div = styled.div``;

const H3 = styled.div`
  font-weight: 600;
  text-align: center;
  color: var(--yellow);
`;

const TagsToSelect = styled.div``;

export default function TagsFilter() {
  const [theme] = useTheme(false, true);
  return (
    <Div>
      <H3>Tags</H3>
      <TagsToSelect>oi</TagsToSelect>
      <ButtonsWrapper theme={theme[1]}>
        <NormalButton>Salvar Tags</NormalButton>
      </ButtonsWrapper>
    </Div>
  );
}
