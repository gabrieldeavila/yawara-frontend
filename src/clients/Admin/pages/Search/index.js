import { useParams } from "react-router";
import React, { useState } from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/all";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import SearchUser from "../../../../components/SearchUser";
import Title from "../../../../components/Title";

const InfiniteScrollStyled = styled(InfiniteScroll)`
  margin-top: 2rem;
  padding: 1rem;
`;

const H2 = styled.h2`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  margin-top: 5rem;
  color: var(--green);
`;

export default function AdminSearch() {
  const { search_term } = useParams();

  const [users, setUsers] = useState([
    {
      id: 0,
      user: "John Doe",
      profile_pic: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      user: "John Doe",
      profile_pic: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 3,
      user: "John Doe",
      profile_pic: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 4,
      user: "John Doe",
      profile_pic: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 7,
      user: "John Doe",
      profile_pic: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 9,
      user: "John Doe",
      profile_pic: "https://i.pravatar.cc/150?img=1",
    },
  ]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    let moreUsers = {
      id: Math.random(),
      user: "John Doe",
      profile_pic: "https://i.pravatar.cc/150?img=1",
    };

    setUsers([...users, moreUsers]);
    if (users.length > 3) {
      setHasMore(false);
    }
  };
  return (
    <div className="search">
      <h3>
        <span>Mostrando resultados para: </span>
        <>
          <p className="search_quote">
            <ImQuotesLeft size={10} />
          </p>
          <strong className="search_term">{search_term}</strong>
          <p className="search_quote">
            <ImQuotesRight size={10} />
          </p>
        </>
      </h3>
      <InfiniteScrollStyled
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<H2>Carregando...</H2>}
        endMessage={<H2>Todos os usuários foram atingidos :/</H2>}
      >
        <SearchUser data={users} />
      </InfiniteScrollStyled>
    </div>
  );
}
