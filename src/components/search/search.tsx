import { Themes } from "../../enums/enums";
import styles from "./search.module.css";

interface SearchProps {
  theme:Themes
}

const Search = ({theme}: SearchProps) => {
  return (
    <div className={`${styles.Search} ${theme}`} data-testid="Search">
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
