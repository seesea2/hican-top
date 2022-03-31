import Axios from "axios";
import { Response } from "express";

import { busStopsUrl, headerConfig } from "./lta";
import { BusStop } from "./bus-stops-interface";

let busStops: BusStop[] = [];

async function getBusStopsFromLta(skip?: number): Promise<BusStop[]> {
  try {
    let url = busStopsUrl;
    if (skip) {
      url += `?$skip=${skip}`;
    }
    let response = await Axios.get(url, headerConfig);
    if (response.status != 200) {
      throw { status: response.status };
    }
    return response.data.value;
  } catch (e) {
    throw e;
  }
}

async function getAllBusStops() {
  try {
    let skip = 0;
    let newBusStops: BusStop[] = [];
    do {
      newBusStops = await getBusStopsFromLta(skip);
      let temp = busStops;
      busStops = temp.concat(newBusStops);
      skip += 500;
    } while (newBusStops.length === 500);
  } catch (e) {
    busStops = [];
    getAllBusStops();
  }
}
getAllBusStops();

function checkBusStopLocally(busStopCode: string) {
  if (!busStopCode) {
    return;
  }
  return busStops.find((item) => item.BusStopCode === busStopCode);
}

function getBusStop(busStopCode: string, res: Response) {
  if (!busStopCode) {
    return res.status(400).send({ message: "Invalid Bus Stop Code." });
  }
  let busStop = checkBusStopLocally(busStopCode);
  if (busStop) {
    return res.status(200).send(busStop);
  }
  return res.status(400).send({ message: "Bus Stop info not found." });
}

function getNearbyBusStops(latitude: number, longitude: number, res: Response) {
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).send({ message: "Invalid coordinates." });
  }

  let nearbyStops = [];
  const R = 6371e3;
  for (let i in busStops) {
    let dLat = ((busStops[i].Latitude - latitude) * Math.PI) / 180;
    let dLong = ((busStops[i].Longitude - longitude) * Math.PI) / 180;

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((busStops[i].Latitude * Math.PI) / 180) *
        Math.cos((latitude * Math.PI) / 180) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let dist = R * c;
    if (Math.abs(dist) < 280) {
      nearbyStops.push({ dist: dist, busStop: busStops[i] });
    }
  }
  nearbyStops = nearbyStops.sort((a, b) => {
    if (a.dist > b.dist) {
      return 1;
    } else if (a.dist < b.dist) {
      return -1;
    } else {
      return 0;
    }
  });
  res.status(200).send(nearbyStops);
}

export { busStops, checkBusStopLocally, getBusStop, getNearbyBusStops };
