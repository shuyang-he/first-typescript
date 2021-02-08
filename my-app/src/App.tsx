import React, { useState, useEffect } from "react";
import style from "./App.module.scss";

function App() {
  const [data, setData] = useState<any>({});
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

  useEffect(() => {
    const pokemonAPI: string = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    fetch(pokemonAPI)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

  const handlePrev = () => {
    setOffset(offset - limit);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  return (
    <div className={`container ${style.App}`}>
      <ul className={style.list}>
        {data && data.results
          ? data.results.map((item: any, index: number) => {
              return (
                <li key={index} className={style.list__item}>
                  <h4>{item.name}</h4>
                </li>
              );
            })
          : null}
      </ul>
      <div className={style.button_con}>
        <button
          className={`${offset === 0 ? style.button_con__item__inactive : ``} ${
            style.button_con__item
          }`}
          onClick={handlePrev}
        >
          <h4>Prev</h4>
        </button>
        <button className={style.button_con__item} onClick={handleNext}>
          <h4>Next</h4>
        </button>
      </div>
    </div>
  );
}

export default App;
