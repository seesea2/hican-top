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
const kActivityHtml = `
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  </head>

  <body>
    <div style="margin: 32px">
      <h2>Activity Notification!</h2>
      <p>
        CONTENTS

        <br><br>Regards<br />
        MSI<br />
      </p>
    </div>
  </body>
  
  <style>
    * {
      font-family: Helvetica, sans-serif, Arial;
    }
  </style>
</html>  
`;
function emailActivity(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let smtpTransport = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            requireTLS: true,
            auth: {
                user: "yuanchao@outlook.sg",
                pass: "pingmeHC83",
            },
            logger: true,
        });
        let html = kActivityHtml;
        let newContent = "<table>";
        let newContentEnd = "</table>";
        newContent += "<tr>";
        newContentEnd = "</tr>" + newContentEnd;
        newContent += `<b>Start:</b>${new Date(data.activity.startDatetime).toLocaleString()}<br>`;
        newContent += `<b>End:</b>${new Date(data.activity.endDatetime).toLocaleString()}<br>`;
        newContent += `<b>Affected Systems:</b>:${data.activity.affectedSystems}<br>`;
        newContent += "<hr />";
        newContent += "<b>Impact:</b><br>";
        newContent += data.activity.impact
            .replace(/\r\n/g, "<br>")
            .replace(/\n/g, "<br>");
        newContent += "<br><b>No Impact:</b><br>";
        newContent += data.activity.noImpact
            .replace(/\r\n/g, "<br>")
            .replace(/\n/g, "<br>");
        newContent += "<br><hr />";
        newContent += "<b>Stakeholders:</b>";
        newContent += data.activity.stakeholders;
        newContent += "<br><b>Implementation Teams:</b>";
        newContent += data.activity.teams;
        newContent += "<br><b>Contact Persons:</b>";
        newContent += data.activity.contactPersons;
        newContent += "<br><hr>";
        newContent += "<b>Risk & Mitigation:</b>";
        newContent += data.activity.riskAndMitigation
            .replace(/\r\n/g, "<br>")
            .replace(/\n/g, "<br>");
        newContent += "<br><b>Remarks:</b>";
        newContent += data.activity.remarks
            .replace(/\r\n/g, "<br>")
            .replace(/\n/g, "<br>");
        html = html.replace("CONTENTS", newContent + newContentEnd);
        console.log(html);
        let info = yield smtpTransport.sendMail({
            from: '"Li YuanChao" <yuanchao@outlook.sg>',
            to: '"Li YuanChao" <yuanchao@outlook.sg>',
            subject: "Email for Activity",
            text: "Happy Birthday to you!",
            html: html,
        });
        console.log("info", info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}
exports.emailActivity = emailActivity;
