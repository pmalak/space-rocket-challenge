import React, { useEffect }       from "react";
import { Routes, Route }          from "react-router-dom";
import { Box, Flex, Text }        from "@chakra-ui/core";
import Launches                   from "./launches";
import Launch                     from "./launch";
import Home                       from "./home";
import LaunchPads                 from "./launch-pads";
import LaunchPad                  from "./launch-pad";
import { useSpaceX }              from "../utils/use-space-x";
import { getTimezonesBySiteName } from "../utils/getTImezonesBySiteName";
import { FavoriteLaunchesDrawer } from "../components/favorites-drawer";

export default function App() {

  const { data } = useSpaceX(
    "/launchpads",
  );

  useEffect(() => {
    const getter = async () => {
      if (data) {
        const timezonesBySiteName = await getTimezonesBySiteName(data)
        console.log("timezonesBySiteName", timezonesBySiteName)
      }
    }
    getter()
  }, [data])

  return (
    <div>
      <NavBar />
      <Box
        as="main"
        mt="100px"
      >

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/launches"
            element={<Launches />}
          />
          <Route
            path="/launches/:launchId"
            element={<Launch />}
          />
          <Route
            path="/launch-pads"
            element={<LaunchPads />}
          />
          <Route
            path="/launch-pads/:launchPadId"
            element={<LaunchPad />}
          />
        </Routes>
      </Box>
    </div>
  );
}

function NavBar() {
  return (
    <Flex
      as="header"
      position="fixed"
      w="100%"
      top={0}
      zIndex={2}
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>

      <FavoriteLaunchesDrawer />
    </Flex>
  );
}
