import React                          from "react";
import {
  Badge,
  Box,
  Button,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay, Image, Text, useDisclosure,
}                                     from "@chakra-ui/core";
import { useFavoriteLaunches }        from "../utils/favorites-context";
import { ToggleFavoriteLaunchButton } from "./toggle-favorite-flight-button";
import { Link }                       from "react-router-dom";
import { formatDate }                 from "../utils/format-date";

export const FavoriteLaunchesDrawer = () => {
  const { favoriteLaunches } = useFavoriteLaunches()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        finalFocusRef={btnRef}

      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Favorites</DrawerHeader>

          <DrawerBody overflowY={"scroll"}>
            <Text fontSize="md" marginBottom={2}>Launches ({favoriteLaunches.length})</Text>

            {favoriteLaunches.map(launch =>

              <Box position={"relative"}>
                <Box
                  position={"absolute"}
                  top={0}
                  right={0}
                  zIndex={20}
                >

                  <ToggleFavoriteLaunchButton
                    launch={launch}
                    variant="solid"
                  />
                </Box>
                <Link to={`/launches/${launch.flight_number.toString()}`}>
                  <Box
                    boxShadow="md"
                    borderWidth="1px"
                    rounded="lg"
                    overflow="hidden"
                    position="relative"
                    marginBottom={2}
                  >
                    <Image
                      src={
                        launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
                        launch.links.mission_patch_small
                      }
                      alt={`${launch.mission_name} launch`}
                      height={["50px", null, "100px"]}
                      width="100%"
                      objectFit="cover"
                      objectPosition="bottom"
                    />

                    <Image
                      position="absolute"
                      top="5"
                      right="5"
                      src={launch.links.mission_patch_small}
                      height="75px"
                      objectFit="contain"
                      objectPosition="bottom"
                    />


                    <Box p="3">

                      <Box
                        d="flex"
                        alignItems="baseline"
                      >
                        {launch.launch_success ? (
                          <Badge
                            px="2"
                            variant="solid"
                            variantColor="green"
                          >
                            Successful
                          </Badge>
                        ) : (
                          <Badge
                            px="2"
                            variant="solid"
                            variantColor="red"
                          >
                            Failed
                          </Badge>
                        )}
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {launch.mission_name}
                      </Box>


                      <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>

                    </Box>
                  </Box>
                </Link>
              </Box>)
            }

          </DrawerBody>


        </DrawerContent>
      </Drawer>
    </>
  );
};



