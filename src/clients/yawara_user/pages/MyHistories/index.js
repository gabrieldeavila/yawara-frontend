import Title from "../../../../components/Title";
import { useContext, useState } from "react";
import { StyledWrapper } from "../../../../components/Decoration";
import useTitle from "../../../../states/Title/index";
import History from "../../../../components/History";
import { useEffect } from "react";
import axios from "axios";
import { Context } from "../../../../Contexts/GlobalContext";
import _ from "lodash";

export default function MyHistories() {
  const [histories, setHistories] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { bearerToken, reload, setReload } = useContext(Context);

  useEffect(async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/my-histories",
      data: {
        page: page,
      },
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.message) {
          setHasMore(false);
          return;
        }
        setHistories(response.data.success);
      })
      .catch((err) => {
        console.log(err.response, "erro");
      });
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  useTitle("Minhas Histórias");

  return (
    <>
      <Title title="Minhas Histórias" />
      <History
        shouldDelete={true}
        histories={histories}
        moreData={fetchMoreData}
        hasMore={hasMore}
      ></History>
    </>
  );
}
