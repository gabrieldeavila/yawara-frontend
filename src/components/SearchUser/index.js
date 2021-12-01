import styled from "styled-components";
import { Link } from "react-router-dom";

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
  return (
    <StyledContainer>
      {data.map((item) => (
        <StyledLink
          to={`/admin/view/${item.id}`}
          className="select-user-details"
          key={item.id}
        >
          <img src={item.profile_pic} alt={item.user} />
          <h4>{item.user}</h4>
        </StyledLink>
      ))}
    </StyledContainer>
  );
}
