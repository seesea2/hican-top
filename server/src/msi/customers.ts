import { dbOpen } from "../db-ops";

const dbEmailsColumns = [
  "email",
  "name",
  "company",
  "team",
  "role",
  "created",
  "updated",
  "status",
];

function insertEmail(data: any) {
  if (!data || !data.email || !data.email.includes("@")) {
    return { err: "Invalid email." };
  }

  try {
    data.email = data.email.toLowerCase();
    // check if existing
    let db = dbOpen();
    let stmt = db.prepare(
      `select * from Emails where "email"='${data.email}';`
    );
    let record = stmt.get();
    if (record && record.email) {
      db.close();
      return { err: "Email existed." };
    }

    let fields = "";
    let values = "";
    for (let val of dbEmailsColumns) {
      if (["created", "updated"].includes(val)) {
        continue;
      }
      if (data[val]) {
        fields += `"${val}",`;
        values += `'${data[val]}',`;
      }
    }

    fields += `"created"`;
    let dateTimeStr = new Date().toISOString();
    values += `'${dateTimeStr}'`;

    let sql = `insert into "Emails"(${fields}) values(${values});`;
    console.log("sql: ", sql);
    stmt = db.prepare(sql);
    record = stmt.run();
    console.log("insert result record:", record);
    db.close();

    if (data.groups) {
      db = dbOpen();
      for (let group of data.groups) {
        let sql = `insert into "EmailGroupRelation"("email","group","created") values('${data.email}', '${group}', '${dateTimeStr}' );`;
        console.log("insert EmailGroupRelation sql:", sql);
        let stmt = db.prepare(sql);
        console.log(stmt.run());
      }
    }

    return record;
  } catch (e) {
    console.log(e);
    return e;
  }
}

function postEmailGroup(data: any) {
  if (!data || !data.group) {
    return { err: "Invalid group name." };
  }

  try {
    let db = dbOpen();

    if (data.orgGroup != data.group) {
      let stmt = db.prepare(
        `select * from "EmailGroupRelation" where "group"='${data.group}'`
      );
      let record = stmt.get();
      if (record && record.email) {
        db.close();
        return { err: "Issue: Group name existed." };
      }
    }

    let dateTimeStr = new Date().toISOString();
    // update existing email group
    if (data.orgGroup && data.orgGroup != data.group) {
      let sql = `update "EmailGroupRelation" 
        set "group"='${data.group}', "updated"='${dateTimeStr}' 
        where "group"='${data.orgGroup}';`;
      console.log(sql);
      let stmt = db.prepare(sql);
      let ret = stmt.run();
      console.log(ret);
    }

    // insert new email into group
    for (let email of data.emails) {
      if (data.orgEmails && !data.orgEmails.includes(email)) {
        let sql = `insert into "EmailGroupRelation"('email','group','created') values('${email}', '${data.group}', '${dateTimeStr}' );`;
        console.log("insert EmailGroupRelation sql:", sql);
        let stmt = db.prepare(sql);
        stmt.run();
      }
    }

    // remove orgEmail from orgGroup
    for (let orgEmail of data.orgEmails) {
      if (data.emails && !data.emails.includes(orgEmail)) {
        let sql = `delete from "EmailGroupRelation" where "email"='${orgEmail}' and "group"='${data.group}';`;
        console.log("delete from EmailGroupRelation sql:", sql);
        let stmt = db.prepare(sql);
        let ret = stmt.run();
        console.log(ret);
      }
    }

    db.close();

    return { msg: "Successful." };
  } catch (e) {
    console.log(e);
    return e;
  }
}

function deleteEmail(email: string) {
  console.log("deleteEmail:", email);
  try {
    console.log(`delete from Emails where "email"='${email}';`);
    let db = dbOpen();
    let stmt = db.prepare(`delete from Emails where "email"='${email}';`);
    let ret = stmt.run();
    console.log(ret);

    console.log(`delete from EmailGroupRelation where "email"='${email}';`);
    stmt = db.prepare(
      `delete from EmailGroupRelation where "email"='${email}';`
    );
    ret = stmt.run();
    console.log(ret);
    db.close();
    return ret;
  } catch (e) {
    console.log(e);
    return e;
  }
}
function deleteEmailGroup(group: string) {
  console.log("deleteEmailGroup:", group);
  try {
    let db = dbOpen();
    console.log(`delete from EmailGroupRelation where "group"='${group}';`);
    let stmt = db.prepare(
      `delete from EmailGroupRelation where "group"='${group}';`
    );
    let ret = stmt.run();
    console.log(ret);
    db.close();
    return ret;
  } catch (e) {
    console.log(e);
    return e;
  }
}
function allEmails() {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`select * from Emails;`);
    let records = stmt.all();
    db.close();
    return records;
  } catch (e) {
    console.log(e);
    return e;
  }
}
function allEmailGroups() {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`select distinct "group" from EmailGroupRelation;`);
    let records = stmt.all();
    db.close();
    return records;
  } catch (e) {
    console.log(e);
    return e;
  }
}

function emailsInGroup(group: string) {
  try {
    let db = dbOpen();
    let stmt = db.prepare(
      `select distinct "email" from EmailGroupRelation where "group"='${group}';`
    );
    let records = stmt.all();
    db.close();
    return records;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export {
  insertEmail,
  allEmails,
  allEmailGroups,
  postEmailGroup,
  deleteEmail,
  deleteEmailGroup,
  emailsInGroup,
};
