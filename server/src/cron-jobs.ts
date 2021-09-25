import { CronJob } from "cron";

import { RefreshServerPodcast } from "./podcast/rss";

const ConJobs = true;

new CronJob(
  "0 0 */3 * * *",
  function () {
    console.log(
      new Date().toLocaleString(),
      "Scheduler: RefreshServerPodcast()"
    );
    RefreshServerPodcast();
  },
  null,
  true,
  "Asia/Singapore"
);

// RefreshServerPodcast();

export default ConJobs;
