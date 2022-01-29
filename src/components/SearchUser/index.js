import styled from "styled-components";
import { Link } from "react-router-dom";
import { Context } from "../../Contexts/GlobalContext";
import { useContext } from "react";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem 5rem;

  .select-user-details {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    filter: drop-shadow(0px 2px 9px rgba(0, 0, 0, 0.25));
  }

  h4 {
    font-weight: 600;
    color: var(--green);
  }
`;

const StyledLink = styled(Link)`
  width: 14rem;
`;
export default function SearchUser({ data }) {
  const { defaultURL } = useContext(Context);

  return (
    <StyledContainer>
      {data.map((item) => (
        <StyledLink
          to={`/admin/view/${item.id}`}
          className="select-user-details"
          key={item.id}
        >
          <img src={defaultURL + "storage/" + item.path} alt={item.nickname} />
          <h4>{item.nickname}</h4>
        </StyledLink>
      ))}
    </StyledContainer>
  );
}
