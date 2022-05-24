import * as nodemailer from "nodemailer";
import { writeFileSync } from "fs";

import { HtmlJson, createHtmlJson, htmlJsonToString } from "./html-json";

const kHtmlHeader =
  "<head>" +
  '<meta charset="utf-8" />' +
  '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
  '<meta name="viewport" content="width=device-width,initial-scale=1.0" />' +
  "</head>";

const gmail = {
  service: "Gmail",
  requireTLS: true,
  auth: {
    user: Buffer.from("c2Vlc2VhMkBnbWFpbC5jb20=", "base64").toString("ascii"),
    pass: Buffer.from("cGluZ21lSEM4Mw==", "base64").toString("ascii"),
  },
};
const outlook = {
  host: "smtp-mail.outlook.com",
  requireTLS: true,
  auth: {
    user: Buffer.from("eXVhbmNoYW9Ab3V0bG9vay5zZw==", "base64").toString(
      "ascii"
    ),
    pass: Buffer.from("cGluZ21lSEM4M0BAJiY=", "base64").toString("ascii"),
  },
};

async function emailActivity(data: any) {
  try {
    let html = buildHtml(data.activity);
    // writeFileSync("./testHtmlStr.html", html);
    // console.log("buildHtml data:", data);
    // console.log("buildHtml:", html);
    // return;

    let smtpTransport = nodemailer.createTransport(gmail);
    // let smtpTransport = nodemailer.createTransport(outlook);
    let info = await smtpTransport.sendMail({
      // from: "yuanchao@outlook.sg",
      from: "seesea2@gmail.com",
      to: data.emails.toString(),
      subject: "MSI Activity Notification", // Subject line
      text: "MSI Activity Notification.", // plain text content
      html: html, // html content
    });

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // console.log("info", info);
    // return info.envelope;
    let ret = { msg: "Accepted: " + info.accepted.toString() };
    // console.log(ret);
    return ret;
  } catch (e) {
    console.log(e);
    return { err: "Server failure." };
  }
}

function buildJsonForActivity(activity: any) {
  let tableJson = createHtmlJson("table");
  try {
    tableJson.styles.push(
      "width: 100%;border-collapse: collapse;border-style:solid"
    );
    tableJson.properties.push(`border="1px"`);

    const styleStr =
      "border: 1px solid;margin: 2px 2px 2px 2px; padding:2px 2px 2px 2px";
    let elmThead = createHtmlJson("thead");
    elmThead.styles.push(styleStr);
    tableJson.children.push(elmThead);
    let elmTheadTr = createHtmlJson("tr");
    elmTheadTr.styles.push(styleStr);
    elmThead.children.push(elmTheadTr);
    let elmTheadTrTh = createHtmlJson("th");
    elmTheadTr.children.push(elmTheadTrTh);
    elmTheadTrTh.innerText = "Item";
    elmTheadTrTh.styles.push(styleStr);
    elmTheadTrTh = createHtmlJson("th");
    elmTheadTr.children.push(elmTheadTrTh);
    elmTheadTrTh.innerText = "Description";
    elmTheadTrTh.styles.push(styleStr);

    let elmTbody = createHtmlJson("tbody");
    tableJson.children.push(elmTbody);
    elmTbody.styles.push(styleStr);

    if (activity["title"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Title";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["title"];
    }
    if (activity["startDatetime"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Date time";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = new Date(
        activity["startDatetime"]
      ).toLocaleString();
      elmTbodyTrTd.innerText += " - ";
      elmTbodyTrTd.innerText += new Date(
        activity["endDatetime"]
      ).toLocaleString();
      elmTbodyTrTd.styles.push(styleStr);
    }
    if (activity["affectedSystems"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Affected Systems";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = activity["affectedSystems"];
      elmTbodyTrTd.styles.push(styleStr);
    }
    if (activity["impact"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Impact";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["impact"];
    }
    if (activity["noImpact"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "No Impact";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["noImpact"];
    }
    if (activity["stakeholders"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Stakeholders";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["stakeholders"];
    }
    if (activity["teams"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Implementation Teams";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["teams"];
    }
    if (activity["contactPersons"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Contact Persons";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["contactPersons"];
    }
    if (activity["riskAndMitigation"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Risk & Mitigation";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["riskAndMitigation"];
    }
    if (activity["remarks"]) {
      let elmTbodyTr = createHtmlJson("tr");
      elmTbodyTr.styles.push(styleStr);
      elmTbody.children.push(elmTbodyTr);
      let elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.innerText = "Remarks";
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.styles.push("font-weight: bold");
      elmTbodyTrTd = createHtmlJson("td");
      elmTbodyTr.children.push(elmTbodyTrTd);
      elmTbodyTrTd.styles.push(styleStr);
      elmTbodyTrTd.innerText = activity["remarks"];
    }
  } catch (e) {
    console.log(e);
  }

  return tableJson;
}

function buildHtml(activity: any): string {
  let bodyJson = createHtmlJson("body");

  try {
    let elm = createHtmlJson("b");
    elm.innerText = "Dear Stakeholders,";
    bodyJson.children.push(elm);

    // email intro
    elm = createHtmlJson("p");
    elm.innerText =
      "Please be informed that activity '" +
      activity.title +
      "' has been planned.";
    // elm.styles.push("margin-top: 30px");
    bodyJson.children.push(elm);
    elm = createHtmlJson("p");
    elm.innerText = "Kindly refer to the below schedule and impact details:";
    bodyJson.children.push(elm);

    // activity details
    let activityJson = buildJsonForActivity(activity);
    bodyJson.children.push(activityJson);

    // email farewell
    elm = createHtmlJson("p");
    elm.innerText = "Please let us know if any queries.";
    bodyJson.children.push(elm);
    elm = createHtmlJson("p");
    elm.innerText = "Thanks.";
    bodyJson.children.push(elm);
    elm = createHtmlJson("p");
    elm.innerText = "MSI Team";
    bodyJson.children.push(elm);
  } catch (e) {
    console.log(e);
  }
  let html = "<html>" + kHtmlHeader + htmlJsonToString(bodyJson) + "</html>";
  return html;
}

export { emailActivity };
