import { Router } from "express";

import { CheckWord, CheckLemmas } from "./dictionary/dictionary";
import getBusArrival from "./lta/bus-arrival";
import { getBusStop, getNearbyBusStops } from "./lta/bus-stops";
import { getPodcastList } from "./podcast/rss";
import ConJobs from "./cron-jobs";

const apiRouter = Router();

// API of dictionary
apiRouter.get("/dictionary/oxford/lemmas/:word", (req, res) => {
  CheckLemmas(req.params.word, res);
});
apiRouter.get("/dictionary/oxford/:word", (req, res) => {
  CheckWord(req.params.word, res);
});

// API of Bus Arrival
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

// API of podcast
if (!process.env.DEBUG) {
  console.log(ConJobs);
}
apiRouter.get("/podcast", (req, res) => {
  getPodcastList(res);
});

export default apiRouter;
