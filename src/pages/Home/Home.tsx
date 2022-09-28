import { useEffect, useRef, useState } from "react";
import CalendarDataService from "../../services/CalendarDataService";
import EskomCard from "../../components/eskom-card/eskom-card";
import LoadsheddingCalendar from "../../components/loadshedding-calendar/loadshedding-calendar";
import TopDownloads from "../../components/top-downloads/top-downloads";
import {
  IAsset,
  IMachineDataResponse,
  IMyMachineData,
  IMyMachineDataGrouped,
} from "../../interfaces/github";
import styles from "./Home.module.css";
import { Themes } from "../../enums/enums";
import useLocalStorage from "use-local-storage";

interface PagesHomeProps {
  theme: Themes;
  assetName: string;
}

const PagesHome = ({ theme, assetName }: PagesHomeProps) => {
  const [assetData, setAssetData] = useState<IMyMachineDataGrouped[]>(
    {} as IMyMachineDataGrouped[]
  );
  let calServ = useRef<CalendarDataService>(CalendarDataService.getInstance());

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const ddlRef = useRef(null);
  const [downloadData, setDownloadData] = useState<IAsset>();
  const [machineData, setMachineData] = useState<IMyMachineData[]>();

  useEffect(() => {
    fetchAssets(assetName);
  }, [assetName]);
  useEffect(() => {
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

    fetchLatestData();
  }, []);

  const fetchAssets = async (e: any) => {
    var groupedAreas = await calServ.current.fetchGroupedAreaData(e);
    setDownloadData(undefined);
    setAssetData(groupedAreas.data);
  };
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
      <div className={`${styles.main} ${styles[theme]}`}>
        {assetData.length > 0 && (
          <>
            <div className={`${styles.filters}`}>
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
                  <div className={`${styles.downloadHolder} ${theme}`}>
                    <div>Calendar file :</div>
                    <div>
                      <EskomCard theme={theme} downloadData={downloadData} />
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
        <TopDownloads theme={theme}></TopDownloads>
      </div>
    </>
  );
};

export default PagesHome;
