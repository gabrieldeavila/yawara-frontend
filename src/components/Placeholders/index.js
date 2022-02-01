import React from "react";
import {
  TextBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";
import styled from "styled-components";
import "./style.css";

const StyledRound = styled(RoundShape)`
  width: 10rem !important;
  height: 1rem !important;
  margin-bottom: 4rem;
  background-color: var(--green);
`;

const UserRound = styled(RoundShape)`
  width: 4rem !important;
  height: 4rem !important;
  background: var(--green);
`;

const UserText = styled(RoundShape)`
  width: 12rem !important;
  height: 1rem !important;
  background: var(--green);
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledText = styled(RoundShape)`
  width: 10rem !important;
  height: 1rem !important;
`;

const Wrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const WrapperButtons = styled(Wrapper)`
  margin-top: 5rem;
`;

const StyledRectShape = styled(RectShape)`
  width: 12rem !important;
  height: 1rem !important;
  margin-bottom: 1rem;
  background-color: var(--green);
`;

const StyledTextBlock = styled(TextBlock)`
  background-color: var(--green);
  margin-top: 3rem;
`;

const StyledTextBlockSmall = styled(StyledTextBlock)`
  height: 0.75rem !important;
  margin-top: 1rem;
`;

const StyledButtonBlue = styled(StyledRound)`
  height: 1.5rem !important;
  background-color: var(--blue);
`;

const StyledButtonRed = styled(StyledRound)`
  height: 1.5rem !important;
  background-color: var(--red);
`;

const StyledImageBlock = styled(RectShape)`
  height: 20rem !important;
  background-color: var(--green);
  margin-bottom: -2rem;
`;

export const TagsButtonsPlaceholder = () => {
  return (
    <div className="show-loading-animation ">
      <StyledRound />
      <Wrapper>
        <StyledRectShape />
        <StyledRectShape />
        <StyledRectShape />
      </Wrapper>
      <Wrapper>
        <StyledRectShape />
        <StyledRectShape />
        <StyledRectShape />
      </Wrapper>
      <Wrapper>
        <StyledRectShape />
        <StyledRectShape />
        <StyledRectShape />
      </Wrapper>
      <StyledTextBlock />
      <WrapperButtons>
        <StyledButtonBlue />
        <StyledButtonRed />
        <StyledButtonBlue />
      </WrapperButtons>
    </div>
  );
};

export const FilterPlaceholder = () => {
  return (
    <div className="show-loading-animation ">
      <StyledTextBlockSmall />
      <StyledTextBlockSmall />
      <StyledTextBlockSmall />
      <StyledTextBlockSmall />
    </div>
  );
};

export const ProfilePlaceholder = () => {
  return (
    <div className="show-loading-animation ">
      <StyledTextBlock />
      <StyledText />
      <StyledImageBlock />
      <StyledTextBlock />
      <WrapperButtons>
        <StyledButtonBlue />
      </WrapperButtons>
    </div>
  );
};

export const NewHistoryPlaceholder = () => {
  return (
    <div className="show-loading-animation ">
      <StyledTextBlock />
      <StyledText />
      <StyledImageBlock />
      <StyledTextBlock />
      <Wrapper style={{ marginTop: "1rem" }}>
        <StyledRectShape />
        <StyledRectShape />
        <StyledRectShape />
      </Wrapper>
      <Wrapper>
        <StyledRectShape />
        <StyledRectShape />
        <StyledRectShape />
      </Wrapper>
      <Wrapper style={{ marginBottom: "-3rem" }}>
        <StyledRectShape />
        <StyledRectShape />
        <StyledRectShape />
      </Wrapper>
      <StyledTextBlock />
      <WrapperButtons>
        <StyledButtonBlue />
      </WrapperButtons>
    </div>
  );
};

export const HistoriesPlaceholder = () => {
  return (
    <div className="show-loading-animation ">
      <StyledTextBlock />
      <StyledText />
      <StyledImageBlock />
    </div>
  );
};

export const SearchUsersPlaceholder = () => {
  return (
    <div className="show-loading-animation ">
      <UserWrapper>
        <UserRound />
        <UserText />
      </UserWrapper>
    </div>
  );
};
