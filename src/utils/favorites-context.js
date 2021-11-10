import React, { useContext, useEffect, useState } from "react";

const FavoriteLaunchesContext = React.createContext([]);

export const useFavoriteLaunches = () => useContext(FavoriteLaunchesContext);

export const FavoriteLaunchesContextProvider = ({ children }) => {

  const [favoriteLaunches, setFavoriteLaunches] = useState(JSON.parse(localStorage.getItem("favoriteLaunches")) || [])

  useEffect(() => {
    localStorage.setItem("favoriteLaunches", JSON.stringify(favoriteLaunches))
  }, [favoriteLaunches])


  const toggleLaunchFavoriteStatus = (flight_number) => {

    if (favoriteLaunches.includes(flight_number)) {
      const newValue = favoriteLaunches.filter(launches => launches !== flight_number)
      setFavoriteLaunches(newValue)

    } else {
      setFavoriteLaunches(prevState => [...prevState, flight_number])
    }
  }

  const handlers = {
    toggleLaunchFavoriteStatus,
    favoriteLaunches,
  }

  return <FavoriteLaunchesContext.Provider value={handlers}>{children}</FavoriteLaunchesContext.Provider>;
};