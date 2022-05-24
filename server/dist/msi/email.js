"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailActivity = void 0;
const nodemailer = require("nodemailer");
const html_json_1 = require("./html-json");
const kHtmlHeader = "<head>" +
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
        user: Buffer.from("eXVhbmNoYW9Ab3V0bG9vay5zZw==", "base64").toString("ascii"),
        pass: Buffer.from("cGluZ21lSEM4M0BAJiY=", "base64").toString("ascii"),
    },
};
function emailActivity(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let html = buildHtml(data.activity);
            let smtpTransport = nodemailer.createTransport(gmail);
            let info = yield smtpTransport.sendMail({
                from: "seesea2@gmail.com",
                to: data.emails.toString(),
                subject: "MSI Activity Notification",
                text: "MSI Activity Notification.",
                html: html,
            });
            let ret = { msg: "Accepted: " + info.accepted.toString() };
            return ret;
        }
        catch (e) {
            console.log(e);
            return { err: "Server failure." };
        }
    });
}
exports.emailActivity = emailActivity;
function buildJsonForActivity(activity) {
    let tableJson = (0, html_json_1.createHtmlJson)("table");
    try {
        tableJson.styles.push("width: 100%;border-collapse: collapse;border-style:solid");
        tableJson.properties.push(`border="1px"`);
        const styleStr = "border: 1px solid;margin: 2px 2px 2px 2px; padding:2px 2px 2px 2px";
        let elmThead = (0, html_json_1.createHtmlJson)("thead");
        elmThead.styles.push(styleStr);
        tableJson.children.push(elmThead);
        let elmTheadTr = (0, html_json_1.createHtmlJson)("tr");
        elmTheadTr.styles.push(styleStr);
        elmThead.children.push(elmTheadTr);
        let elmTheadTrTh = (0, html_json_1.createHtmlJson)("th");
        elmTheadTr.children.push(elmTheadTrTh);
        elmTheadTrTh.innerText = "Item";
        elmTheadTrTh.styles.push(styleStr);
        elmTheadTrTh = (0, html_json_1.createHtmlJson)("th");
        elmTheadTr.children.push(elmTheadTrTh);
        elmTheadTrTh.innerText = "Description";
        elmTheadTrTh.styles.push(styleStr);
        let elmTbody = (0, html_json_1.createHtmlJson)("tbody");
        tableJson.children.push(elmTbody);
        elmTbody.styles.push(styleStr);
        if (activity["title"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Title";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["title"];
        }
        if (activity["startDatetime"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Date time";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = new Date(activity["startDatetime"]).toLocaleString();
            elmTbodyTrTd.innerText += " - ";
            elmTbodyTrTd.innerText += new Date(activity["endDatetime"]).toLocaleString();
            elmTbodyTrTd.styles.push(styleStr);
        }
        if (activity["affectedSystems"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Affected Systems";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = activity["affectedSystems"];
            elmTbodyTrTd.styles.push(styleStr);
        }
        if (activity["impact"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Impact";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["impact"];
        }
        if (activity["noImpact"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "No Impact";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["noImpact"];
        }
        if (activity["stakeholders"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Stakeholders";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["stakeholders"];
        }
        if (activity["teams"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Implementation Teams";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["teams"];
        }
        if (activity["contactPersons"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Contact Persons";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["contactPersons"];
        }
        if (activity["riskAndMitigation"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Risk & Mitigation";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["riskAndMitigation"];
        }
        if (activity["remarks"]) {
            let elmTbodyTr = (0, html_json_1.createHtmlJson)("tr");
            elmTbodyTr.styles.push(styleStr);
            elmTbody.children.push(elmTbodyTr);
            let elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.innerText = "Remarks";
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.styles.push("font-weight: bold");
            elmTbodyTrTd = (0, html_json_1.createHtmlJson)("td");
            elmTbodyTr.children.push(elmTbodyTrTd);
            elmTbodyTrTd.styles.push(styleStr);
            elmTbodyTrTd.innerText = activity["remarks"];
        }
    }
    catch (e) {
        console.log(e);
    }
    return tableJson;
}
function buildHtml(activity) {
    let bodyJson = (0, html_json_1.createHtmlJson)("body");
    try {
        let elm = (0, html_json_1.createHtmlJson)("b");
        elm.innerText = "Dear Stakeholders,";
        bodyJson.children.push(elm);
        elm = (0, html_json_1.createHtmlJson)("p");
        elm.innerText =
            "Please be informed that activity '" +
                activity.title +
                "' has been planned.";
        bodyJson.children.push(elm);
        elm = (0, html_json_1.createHtmlJson)("p");
        elm.innerText = "Kindly refer to the below schedule and impact details:";
        bodyJson.children.push(elm);
        let activityJson = buildJsonForActivity(activity);
        bodyJson.children.push(activityJson);
        elm = (0, html_json_1.createHtmlJson)("p");
        elm.innerText = "Please let us know if any queries.";
        bodyJson.children.push(elm);
        elm = (0, html_json_1.createHtmlJson)("p");
        elm.innerText = "Thanks.";
        bodyJson.children.push(elm);
        elm = (0, html_json_1.createHtmlJson)("p");
        elm.innerText = "MSI Team";
        bodyJson.children.push(elm);
    }
    catch (e) {
        console.log(e);
    }
    let html = "<html>" + kHtmlHeader + (0, html_json_1.htmlJsonToString)(bodyJson) + "</html>";
    return html;
}
