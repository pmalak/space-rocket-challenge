const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY

export const getTimezonesBySiteName = async (launchPads) => {

  const responses = await Promise.all(launchPads.map(async launchPad => {
    const singleResponse = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${launchPad.location?.latitude.toString()},${launchPad.location?.longitude.toString()}&timestamp=1331161200&key=${googleApiKey}`)
    const { timeZoneId, timeZoneName } = await singleResponse.json()

    return {
      name: launchPad.name,
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

  return result
}