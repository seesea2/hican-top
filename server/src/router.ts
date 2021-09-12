import { Router } from "express";

import { CheckOxfordEntries, CheckOxfordLemmas } from "./dictionary/dictionary";
import getBusArrival from "./lta/bus-arrival";
import { getBusStop, getNearbyBusStops } from "./lta/bus-stops";

const apiRouter = Router();

apiRouter.get("/dictionary/oxford/lemmas/:word", (req, res) => {
  CheckOxfordLemmas(req.params.word, res);
});
apiRouter.get("/dictionary/oxford/:word", (req, res) => {
  CheckOxfordEntries(req.params.word, res);
});
apiRouter.get("/lta/bus/busArrival/:busStopCode", (req, res) => {
  getBusArrival(req.params.busStopCode, res);
});
apiRouter.get("/lta/bus/busStop/:busStopCode", (req, res) => {
  getBusStop(req.params.busStopCode, res);
});

apiRouter.get("/lta/bus/nearbyBusStops", (req, res) => {
  getNearbyBusStops(
    parseFloat(String(req.query.latitude)),
    parseFloat(String(req.query.longitude)),
    res
  );
});

export default apiRouter;
