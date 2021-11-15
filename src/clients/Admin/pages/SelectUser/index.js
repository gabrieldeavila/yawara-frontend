import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

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

export default function SelectUser() {
  useTitle("Selecionar Usuário");
  const data = [
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=1", id: 1 },
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=2", id: 2 },
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=3", id: 3 },
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=4", id: 4 },
  ];
  return (
    <div>
      <Title
        title={"Selecionar Usuário"}
        description={"Procure por um usuário específico "}
      />
      <StyledContainer>
        {data.map((item) => (
          <Link
            to={`/admin/view/${item.id}`}
            className="select-user-details"
            key={item.id}
          >
            <img src={item.profile_pic} alt={item.user} />
            <h4>{item.user}</h4>
          </Link>
        ))}
      </StyledContainer>
    </div>
  );
}
