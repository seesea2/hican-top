import { dbOpen, dbClose } from "../db-ops";
import { createHash } from "crypto";

let allLoginUsers: any = [];

function InsertUser(data: any) {
  if (!data || !data.id || !data.pwd) return;

  try {
    let fields = `"id"`;
    let values = "'" + data.id + "'";

    fields += `,"pwd"`;
    let hash = createHash("sha1").update(data.pwd).digest("hex");
    console.log(hash);
    values += `,'${hash}'`;

    let sql = `insert into "Users"(${fields}) values(${values});`;
    console.log("sql: ", sql);
    let db = dbOpen();
    let stmt = db.prepare(sql);
    stmt.run();
    dbClose(db);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function ChangePwd(data: any) {
  if (!data || !data.oldPwd || !data.newPwd) return false;

  try {
    let oldPwdHash = createHash("sha1").update(data.oldPwd).digest("hex");
    let newPwdHash = createHash("sha1").update(data.newPwd).digest("hex");

    let sql = `update "Users" set "pwd"='${newPwdHash}' where "id"='${data.id}' and "pwd"='${oldPwdHash}'`;

    let db = dbOpen();
    let stmt = db.prepare(sql);
    let rslt = stmt.run();
    console.log(rslt);
    dbClose(db);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
function DeleteUser(id: string) {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`delete from Users where id='${id}';`);
    stmt.run();
    dbClose(db);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function LoginUser(data: any) {
  try {
    if (!data.id || !data.pwd) {
      return;
    }

    for (let i = 0; i < allLoginUsers.length; ++i) {
      if (allLoginUsers[i].id == data.id) {
        return allLoginUsers[i];
      }
    }

    let hash = createHash("sha1").update(data.pwd).digest("hex");
    let sql = `select * from Users where id='${data.id}' and pwd='${hash}';`;
    console.log(sql);
    let db = dbOpen();
    let stmt = db.prepare(sql);
    let record = stmt.get();
    console.log("login: ", record);
    dbClose(db);
    if (record) {
      allLoginUsers.push(record);
      return record;
    } else {
      return false;
      return "user or password not correct.";
    }
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

function LogoutUser(data: any) {
  try {
    console.log(allLoginUsers);
    for (let i = 0; i < allLoginUsers.length; ++i) {
      if (allLoginUsers[i].id == data.id) {
        allLoginUsers.splice(i, 1);
        return true;
      }
    }
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

function AllUsers() {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`select * from Users;`);
    let items = stmt.all();
    // console.log(item);
    dbClose(db);
    return items;
  } catch (e) {
    console.log(e);
  }
}

// for testing
// let user = {
//   id: "t1",
//   pwd: "pwd1",
// };
// InsertUser(user);

export {
  AllUsers,
  ChangePwd,
  DeleteUser,
  InsertUser,
  LoginUser,
  LogoutUser,
  allLoginUsers,
};
