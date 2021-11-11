import { Box, IconButton, Tooltip } from "@chakra-ui/core";
import React, { FC, MouseEventHandler } from "react";
import { ItemTypeEnum, idSlugsByType, useFavoriteLaunches, LaunchTuple } from "../utils/favorites-context";
import { IconButtonProps } from "@chakra-ui/core/dist/IconButton";

type Props = {
  item: LaunchTuple
  preventDefault?: boolean
  toggleItemType: ItemTypeEnum
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "outline" | "ghost" | "unstyled" | "link" | "solid";
}

export const ToggleFavoriteButton: FC<Props> = ({ item, toggleItemType, preventDefault, variant, size }) => {
  const {
    toggleLaunchFavoriteStatus,
    favoriteItems,
  } = useFavoriteLaunches()

  const handleClick: MouseEventHandler = (event): void => {
    if (preventDefault) {
      event.preventDefault()
    }

    toggleLaunchFavoriteStatus(item, toggleItemType)
  }

  const favoriteItemsOfType: LaunchTuple[] = favoriteItems[toggleItemType]

  const isFavorite = favoriteItemsOfType.map(favoriteItem => {
  // @ts-ignore
    return favoriteItem[idSlugsByType[toggleItemType]]
    // @ts-ignore
  }).includes(item[idSlugsByType[toggleItemType]])
  const label = isFavorite ? "remove from favorites" : "add to favorites"

  return (
    <Box padding={"4px"}>
      <Tooltip
        aria-label="toggle favorite tooptip"
        label={label}
        placement="left"
      >

        <IconButton
          aria-label="toggle favorite"
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



