import axios from 'axios'
import moment from 'moment-timezone'

export const getAstroInfo = (today) =>
  axios.get(`https://api.sunrise-sunset.org/json?lat=40.785091&lng=-73.968285&date=${today}&formatted=0`)
  .then(res => {
    if (res.data.status === "OK") {
    //console.log(res.data)
      /* results:
        {
          astronomical_twilight_begin: "2017-04-19T08:29:12+00:00",
          nautical_twilight_begin: "2017-04-19T09:06:00+00:00",
          civil_twilight_begin: "2017-04-19T09:40:42+00:00",
          sunrise: "2017-04-19T10:09:24+00:00",

          day_length: 48648,
          solar_noon: "2017-04-19T16:54:48+00:00",

          sunset: "2017-04-19T23:40:12+00:00"
          civil_twilight_end: "2017-04-20T00:08:54+00:00",
          nautical_twilight_end: "2017-04-20T00:43:36+00:00",
          astronomical_twilight_end: "2017-04-20T01:20:24+00:00",
        },
        response: "OK"
      */
      const timeZ = moment.tz.guess()
      const currentTime = moment().tz(timeZ)
      let possiblePhase = ['astronomical_twilight_end', null]
      for (let timePhase in res.data.results) {
        if (res.data.results.hasOwnProperty(timePhase) && timePhase !== 'day_length' && timePhase !== 'solar_noon') {
          let astroTime = (moment.tz(res.data.results[timePhase], 'UTC')).tz(timeZ)
          let diff = currentTime.diff(astroTime)

          if (diff >= 0) {
            if (diff < possiblePhase[1] || possiblePhase[1] === null) {
              possiblePhase = [timePhase, diff]
            }
          }
        }
      }
      //if all diff values are negative, then it's night-- set to astronomical_twilight_end
      return possiblePhase[0]
    }
  })

