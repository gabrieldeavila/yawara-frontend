import { useParams } from "react-router";
import React, { useState } from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/all";
import History from "../../../../components/History";
import useTitle from "../../../../states/Title";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../../Contexts/GlobalContext";

// função para pesquisar histórias
export default function Search() {
  const { search_term } = useParams();

  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState([]);
  const { bearerToken, defaultURL, filterChanged } = useContext(Context);
  const [hasMore, setHasMore] = useState(true);
  const [histories, setHistories] = useState([]);

  useEffect(async () => {
    setHistories([]);
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/tags",
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        let searchTags = JSON.parse(localStorage.getItem("searchTags")) || [];

        let tags = [];

        response.data.tags.forEach((item) => {
          if (searchTags.includes(item.id)) tags.push(item.name);
        });
        setHasMore(true);
        setTags(tags);
        setSearch(!search);
      })
      .catch((err) => {
        console.log(err, "erro?");
      });
  }, [search_term, filterChanged]);

  useEffect(async () => {
    console.log({
      data: {
        search: search_term,
        tags: tags,
        hasTags: tags > 0 ? true : false,
      },
    });
    await axios({
      method: "post",
      url: defaultURL + "api/search-for",
      data: {
        search: search_term,
        tags: tags,
        hasTags: tags > 0 ? true : false,
      },
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        console.log(response.data);
        setHasMore(false);
        if (response.data.success) setHistories(response.data.success);
      })
      .catch((err) => {
        console.log(err.response, err);
      });
  }, [search]);

  const fetchMoreData = () => {};

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
          {tags.length > 0 && (
            <>
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
          )}
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
