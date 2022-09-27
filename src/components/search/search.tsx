import React, { FC } from "react";
import styles from "./search.module.css";

interface SearchProps {}

const Search = ({}: SearchProps) => {
  return (
    <div className={styles.Search} data-testid="Search">
      <div>
        Search for your city / suburb: <input type={"text"}></input>
      </div>
      also look at using locationAPI
      <div className={`${styles.resultData}`}>
        <h1>Results will show here...</h1>
      </div>
    </div>
  );
};

export default Search;
