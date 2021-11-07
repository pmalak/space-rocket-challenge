import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";

import Launches               from "./launches";
import Launch                 from "./launch";
import Home                   from "./home";
import LaunchPads             from "./launch-pads";
import LaunchPad                         from "./launch-pad";
import { useSpaceX, useSpaceXPaginated } from "../utils/use-space-x";

export default function App() {
  const { data, error, isValidating, size, setSize } = useSpaceX(
    "/launchpads",
  );

  const getTimezonesBySiteName = async (data) => {

    const responses = await Promise.all( data.map( async place => {
      const res = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${place.location?.latitude.toString()},${place.location?.longitude.toString()}&timestamp=1331161200&key=${process.env.GOOGLE_API_KEY}`)
      const ss = await res.json()
      const {timeZoneId, timeZoneName} = ss

      return {
         name: place.name,
         timeZoneId,
         timeZoneName
      }
    }))


    const result = responses.reduce((acc, current) => {
    const { name, timeZoneId, timeZoneName } = current
      return {
      ...acc,
       [name]: {
          timeZoneId,
          timeZoneName
          }
       }
    }, {})

    console.log("result",  result)
  }

  if (data) {
     getTimezonesBySiteName(data)
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
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
    </Flex>
  );
}
