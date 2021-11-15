import Title from "../../../../components/Title";
import { useState } from "react";
import { StyledWrapper } from "../../../../components/Decoration";
import useTitle from "../../../../states/Title/index";
import History from "../../../../components/History";
export default function MyHistories() {
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
  ]);

  const [hasMore, setHasMore] = useState(false);

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
