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
exports.getNearbyBusStops = exports.getBusStop = exports.checkBusStopLocally = exports.busStops = void 0;
const axios_1 = require("axios");
const lta_1 = require("./lta");
let busStops = [];
exports.busStops = busStops;
function getBusStopsFromLta(skip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = lta_1.busStopsUrl;
            if (skip) {
                url += `?$skip=${skip}`;
            }
            let response = yield axios_1.default.get(url, lta_1.headerConfig);
            if (response.status != 200) {
                throw { status: response.status };
            }
            return response.data.value;
        }
        catch (e) {
            throw e;
        }
    });
}
function getAllBusStops() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let skip = 0;
            let newBusStops = [];
            do {
                newBusStops = yield getBusStopsFromLta(skip);
                let temp = busStops;
                exports.busStops = busStops = temp.concat(newBusStops);
                skip += 500;
            } while (newBusStops.length === 500);
        }
        catch (e) {
            exports.busStops = busStops = [];
            getAllBusStops();
        }
    });
}
getAllBusStops();
function checkBusStopLocally(busStopCode) {
    if (!busStopCode) {
        return;
    }
    return busStops.find((item) => item.BusStopCode === busStopCode);
}
exports.checkBusStopLocally = checkBusStopLocally;
function getBusStop(busStopCode, res) {
    if (!busStopCode) {
        return res.status(400).send({ message: "Invalid Bus Stop Code." });
    }
    let busStop = checkBusStopLocally(busStopCode);
    if (busStop) {
        return res.status(200).send(busStop);
    }
    return res.status(400).send({ message: "Bus Stop info not found." });
}
exports.getBusStop = getBusStop;
function getNearbyBusStops(latitude, longitude, res) {
    if (latitude === undefined || longitude === undefined) {
        return res.status(400).send({ message: "Invalid coordinates." });
    }
    let nearbyStops = [];
    const R = 6371e3;
    for (let i = 0; i < busStops.length; i++) {
        let dLat = ((busStops[i].Latitude - latitude) * Math.PI) / 180;
        let dLong = ((busStops[i].Longitude - longitude) * Math.PI) / 180;
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
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
        }
        else if (a.dist < b.dist) {
            return -1;
        }
        else {
            return 0;
        }
    });
    res.status(200).send(nearbyStops);
}
exports.getNearbyBusStops = getNearbyBusStops;
