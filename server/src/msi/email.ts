import * as nodemailer from "nodemailer";

import { dbActivitiesColumns } from "./activities";

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

async function emailActivity(data?: any) {
  let smtpTransport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    // port: 465,
    port: 587,
    // secure: false,
    requireTLS: true,
    auth: {
      user: "yuanchao@outlook.sg",
      pass: "pingmeHC83",
      // user: "yuan_chao_li@msi-global.com.sg",
      // pass: "Password66^^",
    },
    logger: true,
  });
  // smtpTransport = nodemailer.createTransport({
  //   service: "Gmail",
  //   auth: {
  //     user: "seesea2@gmail.com",
  //     pass: "pingmeHC83",
  //   },
  // });

  let html = kActivityHtml;
  let newContent = "<table>";
  let newContentEnd = "</table>";
  newContent += "<tr>";
  newContentEnd = "</tr>" + newContentEnd;
  newContent += `<b>Start:</b>${new Date(
    data.activity.startDatetime
  ).toLocaleString()}<br>`;
  newContent += `<b>End:</b>${new Date(
    data.activity.endDatetime
  ).toLocaleString()}<br>`;
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

  let info = await smtpTransport.sendMail({
    // from: '"Li YuanChao" <yuan_chao_li@msi-global.com.sg>', // sender address
    from: '"Li YuanChao" <yuanchao@outlook.sg>', // sender address
    to: '"Li YuanChao" <yuanchao@outlook.sg>', // receivers address
    // to: "yuan_chao_li@msi-global.com.sg, yuan_chao_li@msi-global.com.sg", // list of receivers
    subject: "Email for Activity", // Subject line
    text: "Happy Birthday to you!", // plain text body
    html: html, // html body
  });

  console.log("info", info);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export { emailActivity };
