"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLoginUsers = exports.LogoutUser = exports.LoginUser = exports.InsertUser = exports.DeleteUser = exports.ChangePwd = exports.AllUsers = void 0;
const db_ops_1 = require("../db-ops");
const crypto_1 = require("crypto");
const dbUserColumns = [
    "id",
    "pwd",
    "email",
    "team",
    "role",
    "created",
    "updated",
    "status",
];
let allLoginUsers = [];
exports.allLoginUsers = allLoginUsers;
function InsertUser(data) {
    console.log("InsertUser", data);
    if (!data || !data.id || !data.pwd) {
        return { err: "ID & Password are required!" };
    }
    try {
        let fields = "created";
        let values = `'${new Date().toISOString()}'`;
        for (let val of dbUserColumns) {
            if (data[val]) {
                data[val] = data[val].replace("'", "''");
                fields += `,"${val}"`;
                if (val != "pwd") {
                    values += `,'${data[val]}'`;
                }
                else {
                    let pwdHash = (0, crypto_1.createHash)("sha1").update(data[val]).digest("hex");
                    values += `,'${pwdHash}'`;
                }
            }
        }
        let sql = `insert into "Users"(${fields}) values(${values});`;
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(sql);
        let rslt = stmt.run();
        db.close();
        if (rslt && rslt.changes) {
            return { msg: "Done" };
        }
        return { err: "Create user failed." };
    }
    catch (e) {
        return { err: e };
    }
}
exports.InsertUser = InsertUser;
function ChangePwd(data) {
    if (!data || !data.oldPwd || !data.newPwd)
        return false;
    try {
        let oldPwdHash = (0, crypto_1.createHash)("sha1").update(data.oldPwd).digest("hex");
        let newPwdHash = (0, crypto_1.createHash)("sha1").update(data.newPwd).digest("hex");
        let sql = `update "Users" set "pwd"='${newPwdHash}' where "id"='${data.id}' and "pwd"='${oldPwdHash}'`;
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(sql);
        let rslt = stmt.run();
        db.close();
        if (rslt && rslt.changes) {
            return { msg: "Done" };
        }
        return { err: "No record is changed." };
    }
    catch (e) {
        console.log(e);
        return { err: e };
    }
}
exports.ChangePwd = ChangePwd;
function DeleteUser(id) {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`delete from Users where id='${id}';`);
        stmt.run();
        db.close();
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
exports.DeleteUser = DeleteUser;
function LoginUser(data) {
    try {
        if (!data.id || !data.pwd) {
            return;
        }
        for (let i in allLoginUsers) {
            if (allLoginUsers[i].id == data.id) {
                return allLoginUsers[i];
            }
        }
        let hash = (0, crypto_1.createHash)("sha1").update(data.pwd).digest("hex");
        let sql = `select * from Users where id='${data.id}' and pwd='${hash}';`;
        console.log(sql);
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(sql);
        let record = stmt.get();
        console.log("login record: ", record);
        db.close();
        if (record) {
            allLoginUsers.push(record);
            return record;
        }
        else {
            return { err: "user or password not correct." };
        }
    }
    catch (e) {
        console.log(e);
        return e.message;
    }
}
exports.LoginUser = LoginUser;
function LogoutUser(data) {
    try {
        console.log(allLoginUsers);
        for (let i in allLoginUsers) {
            if (allLoginUsers[i].id == data.id) {
                allLoginUsers.splice(i, 1);
                return true;
            }
        }
    }
    catch (e) {
        console.log(e);
        return e.message;
    }
}
exports.LogoutUser = LogoutUser;
function AllUsers() {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`select * from Users;`);
        let items = stmt.all();
        db.close();
        return items;
    }
    catch (e) {
        console.log(e);
    }
}
exports.AllUsers = AllUsers;
let user = {
    id: "test",
    pwd: "test",
};
InsertUser(user);
