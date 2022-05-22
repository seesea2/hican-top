import * as nodemailer from "nodemailer";

interface HtmlJson {
  tag: string;
  properties: any[];
  innerText: string;
  children: any[];
}

const kHtmlHeader =
  "<head>" +
  '<meta charset="utf-8" />' +
  '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
  '<meta name="viewport" content="width=device-width,initial-scale=1.0" />' +
  "</head>";

async function emailActivity(data?: any) {
  let html = buildHtml(data.activity);
  console.log("buildHtml data:", data);
  console.log("buildHtml:", html);

  // return;

  let smtpTransport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    // port: 465,
    port: 587,
    // secure: false,
    requireTLS: true,
    auth: {
      user: "yuanchao@outlook.sg",
      pass: "pingmeHC83@@&&",
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

  let info = await smtpTransport.sendMail({
    // from: '"Li YuanChao" <yuan_chao_li@msi-global.com.sg>', // sender address
    from: "yuanchao@outlook.sg", // sender address
    to: "seesea2@gmail.com", // recipients address
    // to: "yuan_chao_li@msi-global.com.sg, yuan_chao_li@msi-global.com.sg", // list of recipients
    subject: "Activity Notification", // Subject line
    text: "Activity Notification.", // plain text body
    html: html, // html body
  });

  // console.log("info", info);
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

function htmlJsonToString(elmJson: HtmlJson) {
  let childrenStr = "";
  for (let child of elmJson.children) {
    childrenStr += htmlJsonToString(child);
  }

  let propertiesStr = "";
  for (let property of elmJson.properties) {
    propertiesStr += property + " ";
  }

  let htmlStr = "";
  if (propertiesStr) {
    htmlStr = "<" + elmJson.tag + " " + propertiesStr + ">";
  } else {
    htmlStr = "<" + elmJson.tag + ">";
  }

  htmlStr += " " + elmJson.innerText + " " + childrenStr;
  htmlStr += "</" + elmJson.tag + ">";

  return htmlStr;
}

function createHtmlElement(tag: string) {
  let elm: HtmlJson = { tag: tag, properties: [], innerText: "", children: [] };
  return elm;
}

function buildHtml(activity: any): string {
  const property = `style="width:100%;margin:0;font-family:Helvetica,Arial,sans-serif;"`;
  let bodyJson = createHtmlElement("body");
  bodyJson.properties.push(property);

  let elm = createHtmlElement("b");
  elm.innerText = "Dear Stakeholders,";
  bodyJson.children.push(elm);

  // email intro
  elm = createHtmlElement("p");
  elm.innerText = "Please be informed that an activity has been planned.";
  bodyJson.children.push(elm);
  elm = createHtmlElement("p");
  elm.innerText = "Kindly refer to the below schedule and impact details:";
  bodyJson.children.push(elm);

  // table for event
  let table = createHtmlElement("table");
  bodyJson.children.push(table);

  let elmThead = createHtmlElement("thead");
  table.children.push(elmThead);
  let elmTheadTr = createHtmlElement("tr");
  elmThead.children.push(elmTheadTr);
  let elmTheadTrTh = createHtmlElement("th");
  elmTheadTr.children.push(elmTheadTrTh);
  elmTheadTrTh.innerText = "Item";
  elmTheadTrTh = createHtmlElement("th");
  elmTheadTr.children.push(elmTheadTrTh);
  elmTheadTrTh.innerText = "Description";

  let elmTbody = createHtmlElement("thead");
  table.children.push(elmTbody);

  if (activity["title"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Title";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["title"];
  }
  if (activity["affectedSystems"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Affected Systems";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["affectedSystems"];
  }
  if (activity["impact"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Impact";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["impact"];
  }
  if (activity["noImpact"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "No Impact";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["noImpact"];
  }
  if (activity["stakeholders"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Stakeholders";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["stakeholders"];
  }
  if (activity["teams"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Implementation Teams";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["teams"];
  }
  if (activity["contactPersons"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Contact Persons";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["contactPersons"];
  }
  if (activity["riskAndMitigation"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Risk & Mitigation";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["riskAndMitigation"];
  }
  if (activity["remarks"]) {
    let elmTbodyTr = createHtmlElement("tr");
    elmTbody.children.push(elmTbodyTr);
    let elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = "Remarks";
    elmTbodyTrTd.properties.push('style="font-weight: bold"');
    elmTbodyTrTd = createHtmlElement("td");
    elmTbodyTr.children.push(elmTbodyTrTd);
    elmTbodyTrTd.innerText = activity["remarks"];
  }

  // signature
  elm = createHtmlElement("p");
  elm.innerText = "Please let me know if any queries.";
  bodyJson.children.push(elm);
  elm = createHtmlElement("p");
  elm.innerText = "Thanks.<br><br><hr>";
  bodyJson.children.push(elm);

  let styleJson = createHtmlElement("style");
  styleJson.innerText =
    "table {width: 100%;border-collapse: collapse;} table, th, td {border: 1px solid;}";
  bodyJson.children.push(styleJson);

  let html = "<html>" + kHtmlHeader + htmlJsonToString(bodyJson) + "</html>";
  // html.replace(/\r\n/g, "<br>");
  // html.replace(/\n/g, "<br>");
  return html;
}

export { emailActivity };
