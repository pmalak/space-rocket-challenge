import React, { FC } from "react";
import { Badge, Box, Image, Text } from "@chakra-ui/core";
import { ToggleFavoriteButton } from "../toggle-favorite-item-button";

import { Link } from "react-router-dom";
import { formatDate } from "../../utils/format-date";
import { Launch } from "../../types/launch";
import { ItemTypeEnum } from "../../types";

type Props = {
  launches: Launch[]
}
export const FavoriteLaunches: FC<Props> = ({ launches }) => {

  return (
    <>
      <Text
        marginTop={4}
        fontSize="md"
        fontWeight="bold"
      >Launches ({launches.length})</Text>

      {launches.map(launch =>
        <Box
          position={"relative"}
          key={launch.flight_number}
        >
          <Box
            position={"absolute"}
            top={0}
            right={0}
            zIndex={20}
          >

            <ToggleFavoriteButton
              item={launch}
              toggleItemType={ItemTypeEnum.Launch}
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
    </>
  );
};



