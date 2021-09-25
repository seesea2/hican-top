"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dictionary_1 = require("./dictionary/dictionary");
const bus_arrival_1 = require("./lta/bus-arrival");
const bus_stops_1 = require("./lta/bus-stops");
const rss_1 = require("./podcast/rss");
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
exports.default = apiRouter;
