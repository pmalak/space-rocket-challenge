import React                                      from "react";
import {
  Button,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay, useDisclosure,
}                                                 from "@chakra-ui/core";
import { ItemTypeEnum, useFavoriteLaunches } from "../../utils/favorites-context";
import { FavoriteLaunches }                       from "./FavoriteLaunches";
import { FavoriteLaunchPads }                     from "./FavoriteLaunchPads";

export const FavoriteLaunchesDrawer = () => {
  const { favoriteItems } = useFavoriteLaunches()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const favoriteLaunches = favoriteItems[ItemTypeEnum.Launch]
  const favoriteLaunchPads = favoriteItems[ItemTypeEnum.LaunchPad]

  return (
    <>
      <Button
        ref={btnRef}
        variantColor="white"
        size="sm"
        variant="outline"
        onClick={onOpen}
      >
        Favorites
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Favorites</DrawerHeader>

          <DrawerBody overflowY={"scroll"}>
            <FavoriteLaunchPads launchPads={favoriteLaunchPads} />
            <FavoriteLaunches launches={favoriteLaunches} />

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};



