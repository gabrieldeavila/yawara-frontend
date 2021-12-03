import React, { useState } from "react";
import styled from "styled-components";
import History from "../../../../components/History";
import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";

const DivExplore = styled.div``;

// função para mostrar novas histórias para o usuário
export default function Explore() {
  // dados estão fixos
  const [hasMore, setHasMore] = useState(true);
  const [histories, setHistories] = useState([
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
      id: 110,
      title: "Gatos Mais Estranhos do Mundo",
      creator: "John Doe",
      creation_date: "11/08/2021",
      image:
        "https://m.extra.globo.com/incoming/6919755-eb9-1d8/w488h275-PROP/gato-batman-1.jpg",
    },
    {
      id: 10,
      title: "Gatos Mais Estranhos do Mundo",
      creator: "John Doe",
      creation_date: "11/08/2021",
      image:
        "https://m.extra.globo.com/incoming/6919755-eb9-1d8/w488h275-PROP/gato-batman-1.jpg",
    },
  ]);

  const fetchMoreData = () => {
    console.log("tem que fetchar mais data");
    let moreHistories = {
      id: Math.random(),
      title: "Gatos Mais Estranhos do Mundo",
      creator: "John Doe",
      creation_date: "11/08/2021",
      image:
        "https://m.extra.globo.com/incoming/6919755-eb9-1d8/w488h275-PROP/gato-batman-1.jpg",
    };
    setHistories([...histories, moreHistories]);
  };

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
