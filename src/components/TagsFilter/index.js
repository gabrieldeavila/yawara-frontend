import { useState } from "react";
import styled from "styled-components";
import useTheme from "../../states/Theme";
import { ButtonsWrapper, NormalButton } from "../Buttons";
import { CheckSpan, TagsToSelect, Label, Icon } from "../Styled/Tags";

const Div = styled.div`
  margin-bottom: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const H3 = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: var(--yellow);
`;

const StyledLabel = styled(Label)`
  width: 5rem;
  text-overflow: ellipsis;
`;

export default function TagsFilter() {
  const tagsTeste = [
    { name: "Animais", id: 1, checked: true },
    { name: "Menor", id: 2, checked: true },
    { name: "Extremamente Grande", id: 3, checked: false },
    { name: "Animais", id: 4, checked: true },
    { name: "Animais", id: 5, checked: true },
    { name: "Animais", id: 6, checked: false },
    { name: "Animais", id: 7, checked: true },
    { name: "Animais", id: 8, checked: false },
    { name: "Animais", id: 9, checked: true },
  ];
  const [tags, setTags] = useState(tagsTeste);
  const [theme] = useTheme(false, true);
  console.log();
  const handleChange = (idTagChange) => {
    let changed = Array.from(tags).find((tag) => {
      return tag.id === idTagChange ? true : false;
    });

    changed = { ...changed, checked: !changed.checked };
    let allTags = tags.map((t) => t);
    allTags = allTags.map((tag) => {
      return tag.id === changed.id ? changed : tag;
    });
    setTags(allTags);
  };
  return (
    <Div>
      <H3>Tags:</H3>
      <TagsToSelect>
        {Object.keys(tags).map((tag, index) => (
          <StyledLabel key={index} htmlFor={index}>
            <input
              id={index}
              type="checkbox"
              onChange={() => handleChange(tags[tag].id)}
              checked={tags[tag].checked ? true : false}
            />
            <CheckSpan theme={theme[1]}>
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            </CheckSpan>
            <span>{tags[tag].name}</span>
          </StyledLabel>
        ))}
      </TagsToSelect>
    </Div>
  );
}
