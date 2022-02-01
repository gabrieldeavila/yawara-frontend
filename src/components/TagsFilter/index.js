import { useState } from "react";
import styled from "styled-components";
import useTheme from "../../states/Theme";
import { ButtonsWrapper, NormalButton } from "../Buttons";
import { CheckSpan, TagsToSelect, Label, Icon } from "../Styled/Tags";
import useMobile from "../../states/Mobile";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Contexts/GlobalContext";
import _ from "lodash";
import { FilterPlaceholder } from "../Placeholders";

const StyledTagsToSelect = styled(TagsToSelect)`
  height: 9rem;
  overflow: auto;
  @media (max-width: 990px) {
    flex-wrap: nowrap;
    flex-direction: column;
    overflow: auto;
    height: 75%;
  }
`;

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

const StyledLabel = styled(Label)``;

const TagNameSpan = styled.span`
  overflow: hidden;
  width: 9rem;
  text-overflow: ellipsis;
`;

export default function TagsFilter() {
  const isMobile = useMobile(990, true);
  const { bearerToken, setFilterChanged, filterChanged } = useContext(Context);

  const tagsTeste = [];
  const [tags, setTags] = useState(tagsTeste);
  const [theme] = useTheme(false, true);
  const [reloadTags, setReloadTags] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    return () => {
      setFilterChanged(!filterChanged);
    };
  }, []);

  useEffect(async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/tags",
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        setTags(response.data.tags);
        setIsReady(true);
        setReloadTags(!reloadTags);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    let tagsVerify = JSON.parse(localStorage.getItem("searchTags")) || [];

    let changeTags = _.map(tags, (tag) => {
      let tagSelect = _.find(tagsVerify, (tagVerify) => {
        return tag.id === tagVerify;
      });

      if (!_.isUndefined(tagSelect)) {
        return { ...tag, checked: true };
      }

      return { ...tag, checked: false };
    });
    setTags(changeTags);
  }, [reloadTags]);

  const handleChange = (tag) => {
    let searchTags = JSON.parse(localStorage.getItem("searchTags")) || [];

    if (searchTags.includes(tag.id)) {
      searchTags = searchTags.filter((t) => t !== tag.id);
    } else if (!searchTags.includes(tag.id)) {
      searchTags.push(tag.id);
    }

    localStorage.setItem("searchTags", JSON.stringify(searchTags));
    setReloadTags(!reloadTags);
  };

  return (
    <Div>
      <H3>Tags:</H3>
      {isReady ? (
        <StyledTagsToSelect>
          {tags.map((tag, index) => (
            <StyledLabel key={index} htmlFor={index}>
              <input
                id={index}
                type="checkbox"
                onChange={() => handleChange(tag)}
                checked={tag.checked ? true : false}
              />
              <CheckSpan theme={theme[1]}>
                <Icon viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </Icon>
              </CheckSpan>
              <TagNameSpan>{tag.name}</TagNameSpan>
            </StyledLabel>
          ))}
        </StyledTagsToSelect>
      ) : (
        <FilterPlaceholder />
      )}
    </Div>
  );
}
