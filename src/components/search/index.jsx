import React, { useCallback, useContext, useState } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";
import styles from "./search.module.scss";

function Search() {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (evt) => {
    setValue(evt.target.value);
    updateSearchValue(evt.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        className={styles.input}
        type="text"
        onChange={(evt) => onChangeInput(evt)}
        value={value}
        placeholder="Поиск пиццы"
      />
    </div>
  );
}

export default Search;
