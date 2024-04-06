import { HttpException } from "@nestjs/common";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export class SendGridUtils {
  static sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string
  ): Promise<any> => {
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: subject,
      text: text,
      html: html,
    };
    try {
      await sgMail.send(msg);
      return { success: true };
    } catch (e) {
      throw new HttpException(e.response.body.errors, e.code);
    }
  };
  static batchSendEmails = async (
    emails: Array<{
      to: string;
      subject: string;
      text: string;
      html: string;
    }>
  ): Promise<any> => {
    const msg = emails.map((email) => ({
      to: email.to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }));
    try {
      await sgMail.send(msg);
      return { success: true };
    } catch (e) {
      throw new HttpException(e.response.body.errors, e.code);
    }
  };
}
