import { LaunchPad } from "../types/launchpad";

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
type GetTimezonesBySiteName = (launchPads: LaunchPad[]) => Promise<{
  [key: string]: {
    timeZoneId: number,
    timeZoneName: string
  }
} | undefined>


export const getTimezonesBySiteName: GetTimezonesBySiteName = async (launchPads) => {

  try {
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

  } catch (error) {
    console.log(error)

    return
  }

}
