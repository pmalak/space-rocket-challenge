import { Box, IconButton, Tooltip } from "@chakra-ui/core";
import React                        from "react";
import { useFavoriteLaunches }      from "../utils/favorites-context";


export const ToggleFavoriteLaunchButton = ({ launch, preventDefault, variant, size }) => {
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
  const label = isFavorite ? "remove from favorites" : "add to favorites"

  return (
    <Box padding={"4px"}>
      <Tooltip
        label={label}
        placement="left"
      >

        <IconButton
          aria-label={`toggle flight ${launch.flightNumber}`}
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



