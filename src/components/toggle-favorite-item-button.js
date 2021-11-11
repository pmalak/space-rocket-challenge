import { Box, IconButton, Tooltip }                              from "@chakra-ui/core";
import React                                                     from "react";
import { favoriteItemTypes, idSlugsByType, useFavoriteLaunches } from "../utils/favorites-context";


export const ToggleFavoriteButton = ({ item, type, preventDefault, variant, size }) => {
  const {
    toggleLaunchFavoriteStatus,
    favoriteItems,
  } = useFavoriteLaunches()

  const handleClick = (e) => {
    if (preventDefault) {
      e.preventDefault()
    }

    toggleLaunchFavoriteStatus(item, type)
  }

  const favoriteItemsOfType = favoriteItems[type]

  const isFavorite = favoriteItemsOfType.map(favoriteItem => {
    return favoriteItem[idSlugsByType[type]]
  }).includes(item[idSlugsByType[type]])
  const label = isFavorite ? "remove from favorites" : "add to favorites"

  return (
    <Box padding={"4px"}>
      <Tooltip
        label={label}
        placement="left"
      >

        <IconButton
          aria-label={`toggle flight ${item.flightNumber}`}
          onClick={handleClick}
          icon="star"
          size={size || "sm"}
          variant={variant || "outline"}
          variantColor={isFavorite ? "yellow" : "gray"}
          isRound
          type="button"
        />
      </Tooltip>
    </Box>
  );
};



