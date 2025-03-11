"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerConfig = exports.busStopsUrl = exports.busArrivalUrl = void 0;
const account_keys_1 = require("../account-keys");
const busArrivalUrl = "https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival";
exports.busArrivalUrl = busArrivalUrl;
const busStopsUrl = "https://datamall2.mytransport.sg/ltaodataservice/BusStops";
exports.busStopsUrl = busStopsUrl;
const headerConfig = {
    headers: {
        AccountKey: account_keys_1.ltaAccountKey,
    },
};
exports.headerConfig = headerConfig;
