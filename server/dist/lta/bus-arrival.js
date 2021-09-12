"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const lta_1 = require("./lta");
const bus_stops_1 = require("./bus-stops");
function getBusArrival(busStopCode, res) {
    busStopCode = busStopCode.trim();
    if (!busStopCode) {
        return res.status(400).send({ message: "Invalid BusStopCode." });
    }
    let busStop = (0, bus_stops_1.checkBusStopLocally)(busStopCode);
    if (!busStop) {
        return res.status(400).send({ message: "Bus Stop not found." });
    }
    let url = `${lta_1.busArrivalUrl}?BusStopCode=${busStopCode}`;
    axios_1.default.get(url, lta_1.headerConfig)
        .then((respose) => {
        res.status(200).send({ busStop: busStop, busArrival: respose.data });
    })
        .catch((e) => {
        res.status(400).send(e);
    });
}
exports.default = getBusArrival;
