import { dbOpen } from "../db-ops";
import { createHash } from "crypto";

const dbUserColumns = [
  "id",
  "pwd",
  "email",
  "team",
  "role",
  "created",
  "updated",
];

let allLoginUsers: any = [];

function InsertUser(data: any) {
  console.log("InsertUser", data);
  if (!data || !data.id || !data.pwd) {
    return { err: "ID & Password are required!" };
  }

  try {
    let fields = "created";
    let values = `'${new Date().toISOString()}'`;
    for (let ind in dbUserColumns) {
      if (data[dbUserColumns[ind]]) {
        data[dbUserColumns[ind]] = data[dbUserColumns[ind]].replace("'", "''");
        fields += `,"${dbUserColumns[ind]}"`;
        if (dbUserColumns[ind] != "pwd") {
          values += `,'${data[dbUserColumns[ind]]}'`;
        } else {
          let pwdHash = createHash("sha1")
            .update(data[dbUserColumns[ind]])
            .digest("hex");
          values += `,'${pwdHash}'`;
        }
      }
    }

    let sql = `insert into "Users"(${fields}) values(${values});`;
    // console.log("sql: ", sql);
    let db = dbOpen();
    let stmt = db.prepare(sql);
    let rslt = stmt.run();
    db.close();
    if (rslt && rslt.changes) {
      return { msg: "Done" };
    }
    return { err: "Create user failed." };
  } catch (e) {
    // console.log(typeof e, e);
    return { err: e };
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
    // console.log(rslt);
    db.close();
    if (rslt && rslt.changes) {
      return { msg: "Done" };
    }
    return { err: "No record is changed." };
  } catch (e) {
    console.log(e);
    return { err: e };
  }
}
function DeleteUser(id: string) {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`delete from Users where id='${id}';`);
    stmt.run();
    db.close();
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

    for (let i in allLoginUsers) {
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
    console.log("login record: ", record);
    db.close();
    if (record) {
      allLoginUsers.push(record);
      return record;
    } else {
      return { err: "user or password not correct." };
    }
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

function LogoutUser(data: any) {
  try {
    console.log(allLoginUsers);
    for (let i in allLoginUsers) {
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
    db.close();
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
