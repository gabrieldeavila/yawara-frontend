import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";
import SearchUser from "../../../../components/SearchUser";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../../../Contexts/GlobalContext";
import { SearchUsersPlaceholder } from "../../../../components/Placeholders";
import styled from "styled-components";

const H2 = styled.h2`
  font-size: 18px;
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  align-items: center;
`;

export default function SelectUser() {
  useTitle("Selecionar Usuário");
  const { bearerToken, defaultURL } = useContext(Context);

  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: defaultURL + "api/admin/random-users",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      setIsReady(true);
      setData(response.data.success);
    });
  }, []);

  return (
    <>
      <Title
        title={"Selecionar Usuário"}
        description={
          "Usuários aleatórios, para pesquisar por um usuário específico, use a barra de pesquisa."
        }
      />

      {isReady ? (
        <>
          <SearchUser data={data} />
        </>
      ) : (
        <H2>
          <SearchUsersPlaceholder />
          <SearchUsersPlaceholder />
          <SearchUsersPlaceholder />
          <SearchUsersPlaceholder />
        </H2>
      )}
    </>
  );
}
