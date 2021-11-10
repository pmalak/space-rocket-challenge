import { IconButton }          from "@chakra-ui/core";
import React                   from "react";
import { useFavoriteLaunches } from "../utils/favorites-context";


export const ToggleFavoriteLaunchButton = ({flightNumber}) => {
  const {
    toggleLaunchFavoriteStatus,
    favoriteLaunches,
  } = useFavoriteLaunches()

  const handleClick = (e) => {
    e.preventDefault()

    toggleLaunchFavoriteStatus(flightNumber)
  }

  const isFavorite = favoriteLaunches.includes(flightNumber)

  return (
    <IconButton
      aria-label={`toggle flight ${flightNumber}`}
      onClick={handleClick}
      icon="star"
      size="sm"
      variant="outline"
      variantColor={isFavorite? "yellow" : "grey.500"}
      isRound
    />
  );
};



