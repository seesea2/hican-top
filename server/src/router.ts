import { Router } from "express";

import { CheckWord, CheckLemmas } from "./dictionary/dictionary";
import getBusArrival from "./lta/bus-arrival";
import { getBusStop, getNearbyBusStops } from "./lta/bus-stops";
import { getPodcastList } from "./podcast/rss";
import {
  createUser,
  learnWords,
  learntWordsCount,
  addWord,
} from "./learn-english/learn";
import {
  AllActivitity,
  InsertActivitity,
  UpdateActivitity,
  DeleteActivitity,
} from "./msi/activities";
import { LoginUser, LogoutUser, InsertUser } from "./msi/users";

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
  // console.log("in /learn");
  learnWords("", res);
});
apiRouter.get("/learn/:user", (req, res) => {
  // console.log("in /learn/:user");
  if (!req.query.word) {
    learnWords(req.params.user, res);
  } else {
    // for user hide word.
    addWord(req.params.user, String(req.query.word), res);
  }
});
apiRouter.get("/learn/:user/count", (req, res) => {
  // console.log("in /learn/:user/count");
  learntWordsCount(req.params.user, res);
});

// API for msi db
apiRouter.post("/msi/login", (req, res) => {
  console.log(req.body);
  let record = LoginUser(req.body);
  if (record) {
    res.status(200).send();
  } else {
    res.status(403).send();
  }
});
apiRouter.post("/msi/logout", (req, res) => {
  console.log(req.body);
  let record = LogoutUser(req.body);
  if (record) {
    res.status(200).send();
  } else {
    res.status(403).send();
  }
});
apiRouter.post("/msi/register", (req, res) => {
  console.log(req.body);
  let record = InsertUser(req.body);
  if (record) {
    res.status(200).send();
  } else {
    res.status(403).send();
  }
});
apiRouter.get("/msi/activities", (req, res) => {
  let acts = AllActivitity();
  // console.log(typeof acts);
  res.status(200).send(JSON.stringify(acts));
});
apiRouter.post("/msi/activities", (req, res) => {
  console.log("req post:", req.body);
  console.log("req post:", req.params);
  // let data = JSON.parse(req.params);
  // console.log(req.body);

  let id = InsertActivitity(req.body);
  res.status(200).send({ id: id });
});
apiRouter.put("/msi/activities", (req, res) => {
  console.log("req put:", req.body);
  console.log("req put:", req.params);
  // let data = JSON.parse(req.params);
  // console.log(req.body);

  let id = UpdateActivitity(req.body);
  res.status(200).send({ id: id });
});
apiRouter.delete("/msi/activities/:id", (req, res) => {
  console.log("req delete:", req.params.id);
  let rslt = DeleteActivitity(req.params.id);
  if (rslt == true) {
    res.status(200).send();
  } else {
    res.status(500).send({ err: "failed" });
  }
});

// apiRouter.get("/msi/activities/:options", (req, res) => {
//   if (!req.params.options) {
//     res.status(400).send();
//     return;
//   }
//   console.log("req2:", req.params.options);
//   let options = JSON.parse(req.params.options);
//   console.log(options);

//   if (options.type == "INSERT") {
//     InsertActivitity(options.data);
//   } else if (options.type == "DELETE") {
//     DeleteActivitity(options.data);
//   } else {
//     let acts = AllActivitity();
//     res.status(200).send(JSON.stringify(acts));
//   }
// });

export default apiRouter;
