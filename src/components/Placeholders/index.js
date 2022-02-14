import React from "react";
import {
  TextBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";
import styled from "styled-components";
import { ButtonsWrapper } from "../Buttons";
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

const History = styled(RectShape)`
  width: ${(props) => (props.width ? props.width : "30rem")} !important;
  border-radius: 0.5rem;
  height: ${(props) => (props.height ? props.height : "50rem")} !important;
  background: var(--green);
`;

const StyledText = styled(RoundShape)`
  width: 10rem !important;
  height: 1rem !important;
`;

const Wrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.justify ? props.justify : "space-around"};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.width ? props.width : "unset")};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
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

export const ViewHistoryPlaceholder = () => {
  return (
    <div className="show-loading-animation" style={{ width: "100%" }}>
      <Wrapper>
        <Wrapper width="10%">
          <StyledTextBlock />
          <StyledText />
        </Wrapper>
      </Wrapper>
      <Wrapper justify={"space-between"}>
        <Wrapper width="10%">
          <StyledTextBlock />
          <StyledText />
        </Wrapper>
        <Wrapper width="10%">
          <StyledTextBlock />
          <StyledText />
        </Wrapper>
      </Wrapper>

      <Wrapper justify={"start"} align={"center"} style={{ marginTop: "1rem" }}>
        <UserRound />
        <Wrapper width="90%" justify={"space-between"} align="center">
          <Wrapper width="10%">
            <StyledTextBlock />
            <StyledText />
          </Wrapper>
          <Wrapper width="10%">
            <StyledTextBlock />
            <StyledText />
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <Wrapper>
        <History />
      </Wrapper>
    </div>
  );
};

export const ViewUserPlaceholder = () => {
  return (
    <div className="show-loading-animation" style={{ width: "100%" }}>
      <Wrapper justify="space-between" align="center">
        <Wrapper width="20%">
          <UserRound />
          <Wrapper width="40%">
            <StyledTextBlock />
            <StyledText />
          </Wrapper>
        </Wrapper>
        <ButtonsWrapper>
          <StyledButtonRed />
        </ButtonsWrapper>
      </Wrapper>
      <br />
      <Wrapper justify="space-between">
        <Wrapper width="20%">
          <StyledTextBlock />
        </Wrapper>
        <Wrapper width="20%">
          <StyledTextBlock />
        </Wrapper>
      </Wrapper>
      <br />
      <Wrapper justify="space-between" width="15%">
        <StyledTextBlock />
      </Wrapper>
      <br />
      <Wrapper justify="space-around">
        <Wrapper width="30%" direction="column">
          <Wrapper width="30%">
            <StyledTextBlock />
          </Wrapper>
          <Wrapper width="60%" style={{ marginTop: "-3rem" }}>
            <StyledTextBlock />
          </Wrapper>
          <History width="20rem" height="10rem" />
        </Wrapper>
        <Wrapper width="30%" direction="column">
          <Wrapper width="30%">
            <StyledTextBlock />
          </Wrapper>
          <Wrapper width="60%" style={{ marginTop: "-3rem" }}>
            <StyledTextBlock />
          </Wrapper>
          <History width="20rem" height="10rem" />
        </Wrapper>
      </Wrapper>
    </div>
  );
};
