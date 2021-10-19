import Title from "../../../../components/Title";
import { useState } from "react";

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
  
  return (
    <div>
      <Title
        title={"Minhas Histórias"}
        description="Visualize as suas histórias"
      />
    </div>
  );
}
