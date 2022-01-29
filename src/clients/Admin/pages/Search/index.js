import { useParams } from "react-router";
import React, { useState } from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/all";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import SearchUser from "../../../../components/SearchUser";
import useTitle from "../../../../states/Title";
import axios from "axios";
import { Context } from "../../../../Contexts/GlobalContext";
import { useContext } from "react";
import { useEffect } from "react";
import { SearchUsersPlaceholder } from "../../../../components/Placeholders";

const InfiniteScrollStyled = styled(InfiniteScroll)`
  margin-top: 2rem;
  padding: 1rem;
  div {
    gap: 7rem;
  }
`;

const H2 = styled.h2`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  margin-top: 5rem;
  color: var(--green);
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
`;

export default function AdminSearch() {
  const { search_term } = useParams();
  const { bearerToken } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(10);

  const getData = async () => {};

  useEffect(async () => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/admin/search-for",
      data: {
        search: search_term,
        page: page,
      },
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        if (response.data.moreHistories) {
          setHasMore(false);
        }
        setUsers(response.data.success);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [page, search_term]);

  useEffect(() => {
    setHasMore(true);
    setUsers([]);
    setPage(10);
  }, [search_term]);

  const fetchMoreData = () => {
    setPage(page + 10);
  };

  useTitle(`Resultados para "${search_term}"`);

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
        loader={
          <H2 justify="space-between">
            <SearchUsersPlaceholder />
            <SearchUsersPlaceholder />
            <SearchUsersPlaceholder />
          </H2>
        }
        endMessage={<H2>Todos os usuários foram atingidos :/</H2>}
      >
        <SearchUser data={users} />
      </InfiniteScrollStyled>
    </div>
  );
}
