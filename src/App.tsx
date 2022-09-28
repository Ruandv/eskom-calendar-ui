import useLocalStorage from "use-local-storage";
import { IProvince } from "./interfaces/github";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./assets/css/ollie.css";
import brand from "./assets/imgs/brand.png";
import brand2 from "./assets/imgs/brand2.png";
import CalendarDataService from "./services/CalendarDataService";
import ThemeToggel from "./components/theme-toggel/theme-toggel";
import { Themes } from "./enums/enums";
import PagesHome from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Search from "./components/search/search";

function App() {
  let calServ = useRef<CalendarDataService>(CalendarDataService.getInstance());

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? Themes.Dark : Themes.Light
  );
  const [assetName, setAssetName] = useState<string>("");

  const toggleTheme = () => {
    if (theme == Themes.Light) {
      setTheme(Themes.Dark);
    } else {
      setTheme(Themes.Light);
    }
  };
  const [provinceList, setProvinceList] = useState<IProvince[]>(
    {} as IProvince[]
  );

  useEffect(() => {
    const fetchProvinceListData = async () => {
      var d = await calServ.current.fetchProvinceList();
      setProvinceList(d);
    };

    fetchProvinceListData();
  }, []);
  return (
    <>
      <div className="App" data-theme={theme}>
        <div className="content">
          <nav
            id="scrollspy"
            className={`navbar navbar-${theme} bg-${theme} navbar-expand-lg fixed-top affix`}
          >
            <div className="container">
              <a
                className="navbar-brand"
                href="https://www.free-css.com/free-css-templates"
              >
                <img
                  src={theme === Themes.Light ? brand2 : brand}
                  alt="logo"
                  className="brand-img"
                ></img>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  {provinceList.length > 0 &&
                    provinceList.map((x, i) => {
                      return (
                        <li className="nav-item">
                          <a
                            className="nav-link text-capitalize"
                            href="#"
                            onClick={() => setAssetName(x.key)}
                          >
                            {x.value}
                          </a>
                        </li>
                      );
                    })}
                  <li className={`nav-item menu`}>
                    <ThemeToggel
                      currentValue={theme}
                      onToggle={toggleTheme}
                    ></ThemeToggel>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="mainContainer">
            <Routes>
              <Route
                path="/eskom-calendar-ui"
                element={
                  <PagesHome theme={theme} assetName={assetName}></PagesHome>
                }
              />
              <Route path="/search" element={<Search theme={theme}></Search>} />
            </Routes>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
}

export default App;
