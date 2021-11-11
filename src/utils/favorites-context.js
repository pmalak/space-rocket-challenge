import React, { useContext, useEffect, useState } from "react";

const localStorageKey = "favoriteItems"

export const favoriteItemTypes = {
  launch: "launch",
  launchPad: "launchPad"
}

export const idSlugsByType = {
  [favoriteItemTypes.launch]: "flight_number",
  [favoriteItemTypes.launchPad]: "site_id"
}

const defaultValue = {
  [favoriteItemTypes.launch]: [],
  [favoriteItemTypes.launchPad]: []
}

const FavoriteLaunchesContext = React.createContext([]);

export const useFavoriteLaunches = () => useContext(FavoriteLaunchesContext);

export const FavoriteLaunchesContextProvider = ({ children }) => {

  const [favoriteItems, setFavoriteItems] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || defaultValue)

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(favoriteItems))
  }, [favoriteItems])

  const toggleLaunchFavoriteStatus = (item, type) => {
    if (favoriteItems[type]
      .map(favoriteItem => favoriteItem[idSlugsByType[type]])
      .includes(item[idSlugsByType[type]])
    ) {
      const newValue = favoriteItems[type].filter(favoriteItem => favoriteItem[idSlugsByType[type]] !== item[idSlugsByType[type]])

      setFavoriteItems({
        ...favoriteItems,
        [type]: newValue
      })

    } else {
      setFavoriteItems(prevState => (
        {
          ...prevState,
          [type]: [
            ...prevState[type],
            item
          ]
        }
      ))
    }
  }

  const handlers = {
    toggleLaunchFavoriteStatus,
    favoriteItems,
  }

  return <FavoriteLaunchesContext.Provider value={handlers}>{children}</FavoriteLaunchesContext.Provider>;
};