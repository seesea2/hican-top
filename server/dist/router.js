"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bus_arrival_1 = require("./lta/bus-arrival");
const bus_stops_1 = require("./lta/bus-stops");
const rss_1 = require("./podcast/rss");
const learn_1 = require("./learn-english/learn");
const activities_1 = require("./msi/activities");
const users_1 = require("./msi/users");
const customers_1 = require("./msi/customers");
const cron_jobs_1 = require("./cron-jobs");
const apiRouter = (0, express_1.Router)();
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
    let record = (0, users_1.LoginUser)(req.body);
    if (record && record.id == req.body.id) {
        res.status(200).send();
    }
    else {
        res.status(200).send(record);
    }
});
apiRouter.post("/msi/logout", (req, res) => {
    let record = (0, users_1.LogoutUser)(req.body);
    if (record) {
        res.status(200).send();
    }
    else {
        res.status(403).send();
    }
});
apiRouter.post("/msi/user", (req, res) => {
    try {
        let ret = (0, users_1.InsertUser)(req.body.user);
        res.status(200).send(ret);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
apiRouter.put("/msi/user/pwd", (req, res) => {
    let ret = (0, users_1.ChangePwd)(req.body);
    res.status(200).send(ret);
});
apiRouter.get("/msi/activities", (req, res) => {
    let acts = (0, activities_1.AllActivity)();
    res.status(200).send(acts);
});
apiRouter.get("/msi/activities/templates", (req, res) => {
    let templates = (0, activities_1.ActivityTemplates)();
    res.status(200).send(templates);
});
apiRouter.post("/msi/emails", (req, res) => {
    let ret = (0, customers_1.postEmailAddr)(req.body);
    res.status(200).send(ret);
});
apiRouter.get("/msi/emails", (req, res) => {
    let records = (0, customers_1.allEmails)();
    res.status(200).send(records);
});
apiRouter.delete("/msi/emails/:email", (req, res) => {
    let ret = (0, customers_1.deleteEmail)(req.params.email);
    res.status(200).send(ret);
});
apiRouter.delete("/msi/emails/groups/:group", (req, res) => {
    let ret = (0, customers_1.deleteEmailGroup)(req.params.group);
    res.status(200).send(ret);
});
apiRouter.get("/msi/emails/groups", (req, res) => {
    let records = null;
    if (req.query && req.query.email) {
        records = (0, customers_1.groupsOfEmail)(req.query.email);
    }
    else if (req.query && req.query.group) {
        records = (0, customers_1.emailsInGroup)(req.query.group);
    }
    else {
        records = (0, customers_1.allEmailGroups)();
    }
    res.status(200).send(records);
});
apiRouter.post("/msi/emails/group", (req, res) => {
    let ret = (0, customers_1.postEmailGroup)(req.body);
    res.status(200).send(ret);
});
apiRouter.post("/msi/activities", (req, res) => {
    let id = (0, activities_1.InsertActivity)(req.body);
    res.status(200).send({ id: id });
});
apiRouter.put("/msi/activities", (req, res) => {
    let id = (0, activities_1.UpdateActivity)(req.body);
    if (id) {
        res.status(200).send({ id: id });
    }
    else {
        res.status(500).send({ err: "update failed." });
    }
});
apiRouter.delete("/msi/activities/:id", (req, res) => {
    console.log("req delete:", req.params.id);
    let ret = (0, activities_1.DeleteActivity)(req.params.id);
    if (ret == true) {
        res.status(200).send();
    }
    else {
        res.status(500).send({ err: "failed" });
    }
});
apiRouter.post("/msi/activities/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ret = yield (0, activities_1.emailActivity)(req.body);
    res.status(200).send(ret);
}));
exports.default = apiRouter;
