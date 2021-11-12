import React, { FC } from "react";
import { Badge, Box, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { ToggleFavoriteButton } from "../toggle-favorite-item-button";
import { LaunchPad } from "../../types/launchpad";
import { ItemTypeEnum } from "../../types";

type Props = {
  launchPads: LaunchPad[]
}
export const FavoriteLaunchPads: FC<Props> = ({ launchPads }) => {

    return (
      <>
        <Text
          fontSize="md"
          fontWeight="bold"
          marginBottom={2}
        >Launch Pads ({launchPads.length})</Text>

        {launchPads.map(launchPad =>
          (<Box
              position={"relative"}
              key={launchPad.site_id}
              marginBottom={2}
            >
              <Box
                position={"absolute"}
                top={0}
                right={0}
                zIndex={20}
              >

                <ToggleFavoriteButton
                  item={launchPad}
                  toggleItemType={ItemTypeEnum.LaunchPad}
                  variant="solid"
                />

              </Box>

              <Link to={`/launch-pads/${launchPad.site_id}`}>

                <Box
                  boxShadow="md"
                  borderWidth="1px"
                  rounded="lg"
                  overflow="hidden"
                  position="relative"
                >
                  <Box p="6">

                    <Box
                      d="flex"
                      alignItems="baseline"
                    >
                      {launchPad.status === "active" ? (
                        <Badge
                          px="2"
                          variant="solid"
                          variantColor="green"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          px="2"
                          variant="solid"
                          variantColor="red"
                        >
                          Retired
                        </Badge>
                      )}
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {launchPad.attempted_launches} attempted &bull;{" "}
                        {launchPad.successful_launches} succeeded
                      </Box>


                    </Box>


                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {launchPad.name}
                    </Box>
                    <Text
                      color="gray.500"
                      fontSize="sm"
                    >
                      {launchPad.vehicles_launched.join(", ")}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
          ))
        }

      </>
    )
  }
;



