import { Router } from "express";

import { CheckWord, CheckLemmas } from "./dictionary/dictionary";
import getBusArrival from "./lta/bus-arrival";
import { getBusStop, getNearbyBusStops } from "./lta/bus-stops";
import { getPodcastList } from "./podcast/rss";
import { createUser, learnWords, addWord } from "./learn-english/learn";

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

// API for learn English
apiRouter.get("/user/:user", (req, res) => {
  createUser(req.params.user, res);
});
// for non-signin user
apiRouter.get("/learn", (req, res) => {
  learnWords("", res);
});
apiRouter.get("/learn/:user", (req, res) => {
  if (!req.query.word) {
    learnWords(req.params.user, res);
  } else {
    // for user hide word.
    addWord(req.params.user, String(req.query.word), res);
  }
});

export default apiRouter;
