import Axios from "axios";
import { Response } from "express";

import { busArrivalUrl, headerConfig } from "./lta";
import { checkBusStopLocally } from "./bus-stops";

function getBusArrival(busStopCode: string, res: Response) {
  busStopCode = busStopCode.trim();
  if (!busStopCode) {
    return res.status(400).send({ message: "Invalid BusStopCode." });
  }

  let busStop = checkBusStopLocally(busStopCode);
  if (!busStop) {
    return res.status(400).send({ message: "Bus Stop not found." });
  }

  let url = `${busArrivalUrl}?BusStopCode=${busStopCode}`;
  Axios.get(url, headerConfig)
    .then((respose) => {
      res.status(200).send({ busStop: busStop, busArrival: respose.data });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
}

export default getBusArrival;
