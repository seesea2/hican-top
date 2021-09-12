// import { join } from "path";
// import { Database, OPEN_CREATE, OPEN_READWRITE, verbose } from "sqlite3";

// let database: Database = null;

// export function dbRW() {
//   if (!database) {
//     const sqlite3 = verbose();
//     const dbFile = join(__dirname, "/../db.db3");
//     database = new sqlite3.Database(
//       dbFile,
//       OPEN_READWRITE | OPEN_CREATE,
//       (err: string) => {
//         if (err) {
//           console.log("dbRW error", err);
//           database = undefined;
//         }
//       }
//     );
//   }
//   return database;
// }

// export function dbClose() {
//   if (database) {
//     database.close((err: string) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//     database = undefined;
//   }
// }
