"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dictionary_1 = require("./dictionary/dictionary");
const bus_arrival_1 = require("./lta/bus-arrival");
const bus_stops_1 = require("./lta/bus-stops");
const rss_1 = require("./podcast/rss");
const learn_1 = require("./learn-english/learn");
const activities_1 = require("./msi/activities");
const users_1 = require("./msi/users");
const cron_jobs_1 = require("./cron-jobs");
const apiRouter = (0, express_1.Router)();
apiRouter.get("/dictionary/oxford/lemmas/:word", (req, res) => {
    (0, dictionary_1.CheckLemmas)(req.params.word, res);
});
apiRouter.get("/dictionary/oxford/:word", (req, res) => {
    (0, dictionary_1.CheckWord)(req.params.word, res);
});
apiRouter.get("/lta/bus/busArrival/:busStopCode", (req, res) => {
    (0, bus_arrival_1.default)(req.params.busStopCode, res);
});
apiRouter.get("/lta/bus/busStop/:busStopCode", (req, res) => {
    (0, bus_stops_1.getBusStop)(req.params.busStopCode, res);
});
apiRouter.get("/lta/bus/nearbyBusStops", (req, res) => {
    (0, bus_stops_1.getNearbyBusStops)(parseFloat(String(req.query.latitude)), parseFloat(String(req.query.longitude)), res);
});
if (!process.env.DEBUG) {
    console.log(cron_jobs_1.default);
}
apiRouter.get("/podcast", (req, res) => {
    (0, rss_1.getPodcastList)(res);
});
apiRouter.get("/user/:user", (req, res) => {
    (0, learn_1.createUser)(req.params.user, res);
});
apiRouter.get("/learn", (req, res) => {
    (0, learn_1.learnWords)("", res);
});
apiRouter.get("/learn/:user", (req, res) => {
    if (!req.query.word) {
        (0, learn_1.learnWords)(req.params.user, res);
    }
    else {
        (0, learn_1.addWord)(req.params.user, String(req.query.word), res);
    }
});
apiRouter.get("/learn/:user/count", (req, res) => {
    (0, learn_1.learntWordsCount)(req.params.user, res);
});
apiRouter.post("/msi/login", (req, res) => {
    console.log(req.body);
    let record = (0, users_1.LoginUser)(req.body);
    if (record) {
        res.status(200).send();
    }
    else {
        res.status(403).send();
    }
});
apiRouter.post("/msi/logout", (req, res) => {
    console.log(req.body);
    let record = (0, users_1.LogoutUser)(req.body);
    if (record) {
        res.status(200).send();
    }
    else {
        res.status(403).send();
    }
});
apiRouter.post("/msi/user", (req, res) => {
    console.log(req.body);
    try {
        let rslt = (0, users_1.InsertUser)(req.body.user);
        res.status(200).send(rslt);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
apiRouter.put("/msi/user/pwd", (req, res) => {
    console.log(req.body);
    let rslt = (0, users_1.ChangePwd)(req.body);
    res.status(200).send(rslt);
});
apiRouter.get("/msi/activities", (req, res) => {
    let acts = (0, activities_1.AllActivitity)();
    res.status(200).send(acts);
});
apiRouter.post("/msi/activities", (req, res) => {
    console.log("req post:", req.body);
    console.log("req post:", req.params);
    let id = (0, activities_1.InsertActivitity)(req.body);
    res.status(200).send({ id: id });
});
apiRouter.put("/msi/activities", (req, res) => {
    console.log("req put:", req.body);
    console.log("req put:", req.params);
    let id = (0, activities_1.UpdateActivitity)(req.body);
    res.status(200).send({ id: id });
});
apiRouter.delete("/msi/activities/:id", (req, res) => {
    console.log("req delete:", req.params.id);
    let rslt = (0, activities_1.DeleteActivitity)(req.params.id);
    if (rslt == true) {
        res.status(200).send();
    }
    else {
        res.status(500).send({ err: "failed" });
    }
});
exports.default = apiRouter;
