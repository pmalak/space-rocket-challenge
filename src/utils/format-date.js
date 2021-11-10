
const timezonesBySiteName = {
  "VAFB SLC 3W": {
    "timeZoneId": "America/Los_Angeles",
    "timeZoneName": "Pacific Standard Time"
  },
  "CCAFS SLC 40": {
    "timeZoneId": "America/New_York",
    "timeZoneName": "Eastern Standard Time"
  },
  "STLS": {
    "timeZoneId": "America/Chicago",
    "timeZoneName": "Central Standard Time"
  },
  "Kwajalein Atoll": {
    "timeZoneId": "Pacific/Majuro",
    "timeZoneName": "Marshall Islands Time"
  },
  "VAFB SLC 4E": {
    "timeZoneId": "America/Los_Angeles",
    "timeZoneName": "Pacific Standard Time"
  },
  "KSC LC 39A": {
    "timeZoneId": "America/New_York",
    "timeZoneName": "Eastern Standard Time"
  }
}


export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {

    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp, siteName) {

  return new Intl.DateTimeFormat("en-US", {

    timeZone: siteName ? timezonesBySiteName[siteName]?.timeZoneId : Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "long",
  }).format(new Date(timestamp));
}
