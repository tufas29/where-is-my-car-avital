"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Button from "../../components/button/Button";
import style from "./page.module.css";
import Spinner from "../../components/spinner/Spinner";
import converTime from "../../utils/convertTime";

const locations = [
  "זוטא",
  "פיס",
  "הרצל",
  "שיכון הריאל",
  "דיסקונט",
  "סטימצקי",
  "שיקשק",
  "עץ חרוב",
  "דואר",
  "בית הכרם",
];

const Home = () => {
  const [currentLocaton, setCurrentLocaton] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const didInit = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/locations");
      const data = await response.json();
      setCurrentLocaton(data.locations[1].location);
      setLastUpdate(converTime(data.locations[0].updatedAt));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!didInit.current) {
      fetchData();
      didInit.current = true;
    }
  }, [fetchData]);

  const handleClick = async (item) => {
    setCurrentLocaton(item);
    setLastUpdate(converTime(new Date().toISOString()));

    try {
      await fetch(`/api/locations/66bda3fb727a54ef1bd2430f`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newLocation: item }),
      });
    } catch (error) {
      console.error("Error updating locations:", error);
    }
  };

  if (isLoading)
    return (
      <div className={style.container}>
        <Spinner />
      </div>
    );

  if (!isLoading && !currentLocaton)
    return (
      <div className={style.container}>
        <p>אירעה שגיאה</p>
      </div>
    );

  return (
    <div className={style.container}>
      {locations.map((item) => (
        <Button
          key={item}
          item={item}
          currentLocation={currentLocaton}
          handleClick={handleClick}
        />
      ))}
      <p className={style.lastUpdate}>{`עדכון אחרון: ${lastUpdate}`}</p>
    </div>
  );
};

export default Home;
