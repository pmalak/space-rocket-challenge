import React, { useContext, useEffect, useState } from "react";

const FavoriteLaunchesContext = React.createContext([]);

export const useFavoriteLaunches = () => useContext(FavoriteLaunchesContext);

export const FavoriteLaunchesContextProvider = ({ children }) => {

  const [favoriteLaunches, setFavoriteLaunches] = useState(JSON.parse(localStorage.getItem("favoriteLaunches")) || [])

  useEffect(() => {
    localStorage.setItem("favoriteLaunches", JSON.stringify(favoriteLaunches))
  }, [favoriteLaunches])

  const toggleLaunchFavoriteStatus = (launch) => {
    if (favoriteLaunches.map(favoriteLaunch => favoriteLaunch.flight_number).includes(launch.flight_number)) {
      const newValue = favoriteLaunches.filter(favoriteLaunch => favoriteLaunch.flight_number !== launch.flight_number)
      setFavoriteLaunches(newValue)

    } else {
      setFavoriteLaunches(prevState => [...prevState, launch])
    }
  }

  const handlers = {
    toggleLaunchFavoriteStatus,
    favoriteLaunches,
  }

  return <FavoriteLaunchesContext.Provider value={handlers}>{children}</FavoriteLaunchesContext.Provider>;
};