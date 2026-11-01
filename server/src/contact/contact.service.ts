import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.initTransporter();
  }

  private async initTransporter() {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      this.logger.log(`SMTP Mailer initialized using host: ${host}:${port}`);
    } else {
      this.logger.warn(
        "SMTP credentials not fully set in .env. Creating test/fallback transporter."
      );
      // Fallback: Ethereal test or console logger
      const testAccount = await nodemailer.createTestAccount().catch(() => null);
      if (testAccount) {
        this.transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        this.logger.log(`Initialized Ethereal Test SMTP: ${testAccount.user}`);
      } else {
        // Mock JSON transport
        this.transporter = nodemailer.createTransport({
          jsonTransport: true,
        });
      }
    }
  }

  async sendContactEmail(dto: CreateContactDto) {
    const recipient = process.env.SMTP_TO || "sshreyas471@gmail.com";
    const sender = process.env.SMTP_FROM || `"Portfolio Contact" <${process.env.SMTP_USER || "no-reply@portfolio.com"}>`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #6f42c1; margin-top: 0;">New Message from Portfolio Website</h2>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">You received an inquiry from your portfolio contact form.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 120px; border-bottom: 1px solid #f1f5f9; color: #334155;">Sender Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${dto.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #334155;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;"><a href="mailto:${dto.email}">${dto.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #334155;">Subject:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${dto.subject || "No Subject"}</td>
          </tr>
        </table>

        <div style="background: #f8fafc; border-left: 4px solid #6f42c1; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 14px;">Message:</h4>
          <p style="margin: 0; color: #1e293b; white-space: pre-wrap; line-height: 1.6;">${dto.message}</p>
        </div>

        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
          Sent from Shreya's Portfolio • ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    try {
      const info = await this.transporter.sendMail({
        from: sender,
        to: recipient,
        replyTo: dto.email,
        subject: `[Portfolio Inquiry] ${dto.subject || "Message from " + dto.name}`,
        text: `From: ${dto.name} (${dto.email})\nSubject: ${dto.subject || "No Subject"}\n\nMessage:\n${dto.message}`,
        html: htmlContent,
      });

      this.logger.log(`Email successfully sent: ${info.messageId}`);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        this.logger.log(`Ethereal Email Preview URL: ${previewUrl}`);
      }

      return {
        success: true,
        message: "Message sent successfully via SMTP mailer!",
        messageId: info.messageId,
        previewUrl: previewUrl || undefined,
      };
    } catch (error) {
      this.logger.error("Failed to send contact email via SMTP", error);
      throw error;
    }
  }
}
