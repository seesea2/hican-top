"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const rss_1 = require("./podcast/rss");
const ConJobs = true;
new cron_1.CronJob("0 0 */3 * * *", function () {
    console.log(new Date().toLocaleString(), "Scheduler: RefreshServerPodcast()");
    (0, rss_1.RefreshServerPodcast)();
}, null, true, "Asia/Singapore");
exports.default = ConJobs;
