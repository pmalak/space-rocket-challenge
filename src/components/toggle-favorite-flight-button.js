import { Box, IconButton }     from "@chakra-ui/core";
import React                   from "react";
import { useFavoriteLaunches } from "../utils/favorites-context";


export const ToggleFavoriteLaunchButton = ({ launch, preventDefault, variant }) => {
  const {
    toggleLaunchFavoriteStatus,
    favoriteLaunches,
  } = useFavoriteLaunches()

  const handleClick = (e) => {
    if (preventDefault) {
      e.preventDefault()
    }

    toggleLaunchFavoriteStatus(launch)
  }

  const isFavorite = favoriteLaunches.map(favoriteLaunche => favoriteLaunche.flight_number).includes(launch.flight_number)

  return (
    <Box
      padding={"8px"}
    >

      <IconButton
        aria-label={`toggle flight ${launch.flightNumber}`}
        onClick={handleClick}
        icon="star"
        size="sm"
        variant={variant || "outline"}
        variantColor={isFavorite ? "yellow" : "grey"}
        isRound
        type="button"
      />
    </Box>
  );
};



