import useLocalStorage from "use-local-storage";

import {
  IAsset,
  IMachineDataResponse,
  IMyMachineData,
  IMyMachineDataGrouped,
  IProvince,
} from "./interfaces/github";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./assets/css/ollie.css";
import brand from "./assets/imgs/brand.png";
import brand2 from "./assets/imgs/brand2.png";
import CalendarDataService from "./services/CalendarDataService";
import ThemeToggel from "./components/theme-toggel/theme-toggel";
import { Themes } from "./enums/enums";
import LoadsheddingCalendar from "./components/loadshedding-calendar/loadshedding-calendar";
import EskomCard from "./components/eskom-card/eskom-card";
import TopDownloads from "./components/top-downloads/top-downloads";

function App() {
  let calServ = useRef<CalendarDataService>(CalendarDataService.getInstance());

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const ddlRef = useRef(null);
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? Themes.Dark : Themes.Light
  );

  const toggleTheme = () => {
    if (theme == Themes.Light) {
      setTheme(Themes.Dark);
    } else {
      setTheme(Themes.Light);
    }
  };

  const [gitHubAssets, setGitHubAssets] = useState<IAsset[]>({} as IAsset[]);
  const [machineData, setMachineData] = useState<IMyMachineData[]>();

  const [provinceList, setProvinceList] = useState<IProvince[]>(
    {} as IProvince[]
  );
  const [downloadData, setDownloadData] = useState<IAsset>();
  const [assetData, setAssetData] = useState<IMyMachineDataGrouped[]>(
    {} as IMyMachineDataGrouped[]
  );
  const fetchAssets = async (e: any) => {
    var groupedAreas = await calServ.current.fetchGroupedAreaData(e);
    setDownloadData(undefined);
    setAssetData(groupedAreas.data);
  };

  useEffect(() => {
    const fetchProvinceListData = async () => {
      var d = await calServ.current.fetchProvinceList();
      setProvinceList(d);
    };

    const fetchLatestData = async () => {
      var md: IMachineDataResponse =
        await calServ.current.fetchLatestMachineData(0, 1000);
      var mdres: IMyMachineData[] = [] as IMyMachineData[];

      while (md.lastRecord !== md.totalRecords) {
        mdres.push(...md.data);
        md = await calServ.current.fetchLatestMachineData(md.lastRecord, 500);
      }
      mdres.push(...md.data);
      setMachineData(mdres);
    };

    fetchProvinceListData();
    fetchLatestData();
  }, []);

  useEffect(() => {
    if (assetData.length > 0) {
      (ddlRef.current as any).scrollIntoView(true);
    }
  }, [assetData]);

  const fetchAssetByAreaName = async (areaName: string) => {
    var data = await calServ.current.getAssetDataByCalendarName(areaName);
    setDownloadData(data);
  };

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
                            onClick={() => fetchAssets(x.key)}
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

          <div
            className={`${"main"} ${
              assetData.length > 0 ? "icsContainer" : ""
            }`}
          >
            {assetData.length > 0 && (
              <>
                <div className="filters">
                  <label>Filter </label>
                  <select
                    ref={ddlRef}
                    onChange={(e) => {
                      fetchAssetByAreaName(e.target.value);
                    }}
                  >
                    <option key={0}>Select</option>
                    {assetData.length > 0 &&
                      assetData.map((x: IMyMachineDataGrouped, i) => {
                        return (
                          <option key={i + x.area_name} value={x.area_name}>
                            {x.area_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {downloadData && (
                  <>
                    <div>
                      <div className={`downloadHolder ${theme}`}>
                        <div>Calendar file :</div>
                        <div>
                          <EskomCard
                            theme={theme}
                            downloadData={downloadData}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {downloadData && (
                  <div>
                    <LoadsheddingCalendar
                      theme={theme}
                      eventCalendarName={downloadData?.name}
                    ></LoadsheddingCalendar>
                  </div>
                )}
              </>
            )}
          </div>
          <div>
            <TopDownloads></TopDownloads>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
}

export default App;
