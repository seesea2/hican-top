"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = exports.LoadType = exports.FeatureType = void 0;
var LoadType;
(function (LoadType) {
    LoadType[LoadType["SEA"] = 0] = "SEA";
    LoadType[LoadType["SDA"] = 1] = "SDA";
    LoadType[LoadType["LSD"] = 2] = "LSD";
})(LoadType || (exports.LoadType = LoadType = {}));
var FeatureType;
(function (FeatureType) {
    FeatureType[FeatureType["WAB"] = 0] = "WAB";
})(FeatureType || (exports.FeatureType = FeatureType = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType[VehicleType["SD"] = 0] = "SD";
    VehicleType[VehicleType["DD"] = 1] = "DD";
    VehicleType[VehicleType["BD"] = 2] = "BD";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
