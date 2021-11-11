import { Box, IconButton, Tooltip } from "@chakra-ui/core";
import React                                      from "react";
import { favoriteItemTypes, useFavoriteLaunches } from "../utils/favorites-context";


export const ToggleFavoriteButton = ({ item, type,  preventDefault, variant, size }) => {
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
  console.log("type", type)

  console.log("favoriteItems", favoriteItems)

  const favoriteItemsOfType = favoriteItems[type]
  console.log("favoriteItemsOfType", favoriteItemsOfType)

  const isFavorite = favoriteItemsOfType.map(favoriteItem => favoriteItem.flight_number).includes(item.flight_number)
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



