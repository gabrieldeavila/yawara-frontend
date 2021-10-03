import { useState } from "react";
import styled from "styled-components";
import useTheme from "../../states/Theme";
import { ButtonsWrapper, NormalButton } from "../Buttons";

const Div = styled.div`
  margin-bottom: 1.5rem;
`;

const H3 = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: var(--yellow);
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const CheckSpan = styled.span`
  width: 12px;
  display: flex;
  height: 12px;
  border: 2px solid var(--yellow);
  justify-content: center;
  align-items: center;
  svg {
    transition: 0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transform: scale(0);
    stroke: ${(props) =>
      props.theme === "light" ? "var(--white)" : "var(--black)"};
  }
`;

const TagsToSelect = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 5rem;

  span {
    font-weight: 600;
    color: var(--green);
  }
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 0.5rem;
  position: relative;
  input {
    display: none;
  }
  & input:checked ~ ${CheckSpan} svg {
    transform: scale(1.5);
  }
  input:focus + ${CheckSpan} {
    box-shadow: 0 0 0 3px pink;
  }
`;

export default function TagsFilter() {
  const tagsTeste = [
    { name: "Animais", id: 1, checked: true },
    { name: "Animais", id: 2, checked: true },
    { name: "Animais", id: 3, checked: false },
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
          <Label key={index} htmlFor={index}>
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
          </Label>
        ))}
      </TagsToSelect>
    </Div>
  );
}
