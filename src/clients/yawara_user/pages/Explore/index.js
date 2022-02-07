import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import History from "../../../../components/History";
import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";
import axios from "axios";
import { Context } from "../../../../Contexts/GlobalContext";
import _ from "lodash";

const DivExplore = styled.div``;

// função para mostrar novas histórias para o usuário
export default function Explore() {
  // dados estão fixos
  const [hasMore, setHasMore] = useState(true);
  const [histories, setHistories] = useState([]);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(-1);

  const { bearerToken } = useContext(Context);

  const fetchMoreData = () => {
    setPage(page + 2);
    // console.log("tem que fetchar mais data");
    // setHistories([...histories]);
  };

  useEffect(async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/explore",
      data: {
        page: page,
      },
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        console.log(response.data);
        if (
          !_.isEmpty(response.data.success) &&
          response.data.success.length !== histories.length
        )
          setHistories([...response.data.success]);
        else setHasMore(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  useTitle("Explorar");
  return (
    <DivExplore>
      <Title
        title={"Conheça novas Histórias"}
        description={"Explore novas histórias e divirta-se"}
      />
      <History
        histories={histories}
        moreData={fetchMoreData}
        hasMore={hasMore}
      />
    </DivExplore>
  );
}
