import { useParams } from "react-router";
import React, { useState } from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/all";
import History from "../../../../components/History";

export default function Search() {
  const { search_term } = useParams();
  const tags = ["alguma tag", "outra tag", "gatos", "Animais"];
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

  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    let moreHistories = {
      id: Math.random(),
      title: "Gatos Mais Estranhos do Mundo",
      creator: "John Doe",
      creation_date: "11/08/2021",
      image:
        "https://m.extra.globo.com/incoming/6919755-eb9-1d8/w488h275-PROP/gato-batman-1.jpg",
    };
    setHistories([...histories, moreHistories]);
    if (histories.length > 3) {
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
          , com tags:{" "}
          {tags.map((tag, index) => {
            let end = ", ";
            if (tags.length - 2 === index) {
              end = " e ";
            } else if (tags.length - 1 === index) {
              end = ".";
            }
            return (
              <React.Fragment>
                <strong className="search_tag">{tag}</strong>
                <span>{end}</span>
              </React.Fragment>
            );
          })}
        </>
      </h3>

      <History
        histories={histories}
        hasMore={hasMore}
        moreData={fetchMoreData}
      />
    </div>
  );
}
