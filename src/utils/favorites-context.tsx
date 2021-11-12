import React, { FC, useContext, useEffect, useState } from "react";
import { FavoriteItems, ItemTypeEnum, LaunchTuple } from "../types";

const localStorageKey = "favoriteItems"

export const idSlugsByType = {
  [ItemTypeEnum.Launch]: "flight_number",
  [ItemTypeEnum.LaunchPad]: "site_id"
}

const defaultValue = {
  [ItemTypeEnum.Launch]: [],
  [ItemTypeEnum.LaunchPad]: []
}

type ToggleLaunchFavoriteStatus = (item: LaunchTuple, type: ItemTypeEnum) => void


type FavoriteItemsContext = {
  toggleLaunchFavoriteStatus: ToggleLaunchFavoriteStatus,
  favoriteItems: FavoriteItems,
}

type UseFavoriteLaunches = () => FavoriteItemsContext

const FavoriteLaunchesContext = React.createContext<FavoriteItemsContext>({} as FavoriteItemsContext);

export const useFavoriteLaunches: UseFavoriteLaunches = () => useContext(FavoriteLaunchesContext);

export const FavoriteLaunchesContextProvider: FC = ({ children }) => {

  const [favoriteItems, setFavoriteItems] = useState<FavoriteItems>(JSON.parse(
      localStorage.getItem(localStorageKey) as string)
    || defaultValue
  )

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(favoriteItems))
  }, [favoriteItems])

  // FIXME: remove @ts-ignored errors
  const toggleLaunchFavoriteStatus = (item: LaunchTuple, type: ItemTypeEnum) => {
    if (favoriteItems[type]
      // @ts-ignore
      .map(favoriteItem => favoriteItem[idSlugsByType[type]])
      // @ts-ignore
      .includes(item[idSlugsByType[type]])
    ) {// @ts-ignore
      const newValue = favoriteItems[type].filter(favoriteItem => {
        // @ts-ignore
        return favoriteItem[idSlugsByType[type]] !== item[idSlugsByType[type]]
      })

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

  return <FavoriteLaunchesContext.Provider value={handlers}> {children} </FavoriteLaunchesContext.Provider>;
};