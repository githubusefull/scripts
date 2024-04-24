"use server";
import { connectToDb } from "./connect";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import { User } from "./models";
export async function mailAction({ email }) {
  await connectToDb();
  const result = await User.findOne({ email: email });
  if (result) {
    const token = nanoid(32);
    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
    const htmlBody = `
          <!DOCTYPE html>
          <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
          <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
            <style>
              * {
                box-sizing: border-box;
                border-radius: 10px;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: 600;

              }

              body {
                margin: 0;
                padding: 0;
                border-radius: 10px; 
              }
          
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
              }
          
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
              }
          
              p {
                line-height: inherit
              }
          
              .desktop_hide,
              .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
              }
          
              .image_block {
                display: none;

              }
          
              @media (max-width:620px) {
                .desktop_hide table.icons-inner {
                  display: inline-block !important;
                }
          
                .icons-inner {
                  text-align: center;
                }
          
                .icons-inner td {
                  margin: 0 auto;
                }
          
                .mobile_hide {
                  display: none;
                }
          
                .row-content {
                  width: 100% !important;
                }
          
                .stack .column {
                  width: 100%;
                  display: block;
                }
          
                .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
                }
                span {
                  font-weight:600;
                }
                .desktop_hide,
                .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
                }
              }
            </style>
          </head>
          
          <body style="background-color: black; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: black;">
              <tbody>
                <tr>
                  <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <tbody>
                        <tr>
                          <td>
                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: white; width: 600px; margin-top: 20;" width="600">
                              <tbody>
                                <tr>
                                  <td class="column column-1" width="100%" style="mso-table-lspace: padding-bottom: 10px; padding-top: 15px; margin-bottom: 10px; 0pt; mso-table-rspace: 0pt; font-weight: 500; text-align: left;  vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">          
                                    <table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <div class="alignment" align="center" style="line-height:10px; margin-top: 20px;">
                                    <h1 style="font-weight: 700;">Scripts</h1>
                                     </div>
                                      <tr>
                                        <td class="pad">
                                        
                                          <h2 style="margin: 0; color: white; direction: ltr; 
                                         font-size: 20px; font-weight: 500; letter-spacing: normal; line-height: 120%; margin-top: 0; margin-bottom: 0;">
                                          <span class="tinyMce-placeholder">
                                          Hi, there!  You are welcome in Scripts.
                                          </span></h2>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                      <tr>
                                        <td class="pad">
                                          <div style="color:white; direction:ltr; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:500; letter-spacing:0px; line-height:120%; text-align:left; mso-line-height-alt:19.2px;">
                                            <p style="margin: 0; margin-bottom: 16px;">You can login with the following information:</p>
                                            <p style="margin: 0; margin-bottom: 16px; color:white;">E-mail: ${email}</p>
                                            
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="button_block block-4" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="pad">
																	<div class="alignment" align="center">
																	<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
																	 xmlns:w="urn:schemas-microsoft-com:office:word"
                                    href="https://scripts-coral.vercel.app/forgetpassword/${token}" 
																	  style="height:42px; width:119px;v-text-anchor:middle;" arcsize="10%" stroke="false"
																	   fillcolor="#df081e"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px">
																	   <center style="color:black; font-family:Arial, sans-serif; font-size:16px">
																	   <![endif]-->
                                     <a href="https://scripts-coral.vercel.app/forgetpassword/${token}"
																	    target="_blank" style="text-decoration:none;display:inline-block;color:black;
																		background-color:white; border-radius:4px;width:auto;border-top:0px solid 
																		transparent; font-weight:600; border-right:0px solid transparent;border-bottom:0px 
																		solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;">
																		<span style="padding-left:45px;padding-right:45px;font-size:16px;display:inline-block;letter-spacing:normal;">
																		<span style="word-break: break-word; line-height: 32px; font-weight:600;">
																		Login</span></span>
                                    </a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
																</td>


                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><!-- End -->
          </body>
          </html>
          
          `;
    const info = await transport.sendMail({
      from: 'Scripts',
      to: email,
      subject: "Reset Password",
      html: htmlBody,
    });
    console.log("Message sent: %s", info.messageId);

    // Save 
    await User.findOneAndUpdate({ email: email }, {verifytoken: token});
  }
  else
    console.log("User Does not Exist");
}