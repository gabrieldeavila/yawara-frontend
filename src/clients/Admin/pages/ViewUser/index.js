import { useParams } from "react-router";
import { Wrapper } from "../../../../components/Forms";
import { useState, useEffect } from "react";
import { ButtonsWrapper, DangerButton } from "../../../../components/Buttons";
import useTheme from "../../../../states/Theme";
import styled from "styled-components";
import TimeAgo from "javascript-time-ago";
import pt from "javascript-time-ago/locale/pt.json";

const StyledButtonsWrapper = styled(ButtonsWrapper)`
  margin-top: 0;
`;

TimeAgo.addDefaultLocale(pt);
const timeAgo = new TimeAgo("pt-BR");

export default function ViewUser() {
  const { id: userId } = useParams();

  console.log(userId);
  const [theme] = useTheme(false, true);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      id: 1,
      name: "Rick Astley",
      profile_picture: "https://avatars.githubusercontent.com/u/76487489?v=4",
      creation_date: "20/11/2021",
      last_login: [2021, 7, 13, 19, 55, 45],

      histories: [
        {
          id: 0,
          title: "Gatos Mais Estranhos do Mundo",
          creator: "John Doe",
          creation_date: "11/08/2021",
          likes: 1000,
          dislikes: 100,
          image:
            "https://m.extra.globo.com/incoming/6919755-eb9-1d8/w488h275-PROP/gato-batman-1.jpg",
        },
        {
          id: 0,
          title: "Gatos Mais Estranhos do Mundo",
          creator: "John Doe",
          creation_date: "11/08/2021",
          likes: 1000,
          dislikes: 100,
          image:
            "https://m.extra.globo.com/incoming/6919755-eb9-1d8/w488h275-PROP/gato-batman-1.jpg",
        },
      ],
    });
  }, []);
  return (
    <Wrapper>
      <div className="admin-view-header">
        <div className="admin-view-header-user">
          <img
            className="admin-view-header-user_img"
            src={user.profile_picture}
          />
          <h3 className="admin-view-header-user_name">{user.name}</h3>
        </div>
        <StyledButtonsWrapper theme={theme[1]}>
          <DangerButton>Deletar Conta</DangerButton>
        </StyledButtonsWrapper>
      </div>
      <div className="admin-view-sub_header">
        <p>{user.creation_date}</p>
        <p>{user.last_login && timeAgo.format(new Date(...user.last_login))}</p>
      </div>
      <div className="admin-view-content">
        <h2>Histórias</h2>
      </div>
    </Wrapper>
  );
}
