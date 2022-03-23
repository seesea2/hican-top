"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLoginUsers = exports.LogoutUser = exports.LoginUser = exports.InsertUser = exports.DeleteUser = exports.ChangePwd = exports.AllUsers = void 0;
const db_ops_1 = require("../db-ops");
const crypto_1 = require("crypto");
let allLoginUsers = [];
exports.allLoginUsers = allLoginUsers;
function InsertUser(data) {
    if (!data || !data.id || !data.pwd)
        return;
    try {
        let fields = `"id"`;
        let values = "'" + data.id + "'";
        fields += `,"pwd"`;
        let hash = (0, crypto_1.createHash)("sha1").update(data.pwd).digest("hex");
        console.log(hash);
        values += `,'${hash}'`;
        let sql = `insert into "Users"(${fields}) values(${values});`;
        console.log("sql: ", sql);
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(sql);
        stmt.run();
        (0, db_ops_1.dbClose)(db);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
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
        console.log(rslt);
        (0, db_ops_1.dbClose)(db);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
exports.ChangePwd = ChangePwd;
function DeleteUser(id) {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`delete from Users where id='${id}';`);
        stmt.run();
        (0, db_ops_1.dbClose)(db);
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
        for (let i = 0; i < allLoginUsers.length; ++i) {
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
        console.log("login: ", record);
        (0, db_ops_1.dbClose)(db);
        if (record) {
            allLoginUsers.push(record);
            return record;
        }
        else {
            return false;
            return "user or password not correct.";
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
        for (let i = 0; i < allLoginUsers.length; ++i) {
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
        (0, db_ops_1.dbClose)(db);
        return items;
    }
    catch (e) {
        console.log(e);
    }
}
exports.AllUsers = AllUsers;
