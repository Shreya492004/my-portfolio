# NestJS Portfolio Backend with SMTP Mailer

A production-ready NestJS backend service for Shreya's Portfolio, featuring automated contact inquiry processing and SMTP email dispatching via Nodemailer.

## Features

- **NestJS Architecture**: Modular design with Controllers, Services, and DTOs.
- **SMTP Mailer**: Dispatches formatted HTML emails to your inbox (`sshreyas471@gmail.com`) using Nodemailer.
- **Input Validation**: Request payload validation via `class-validator` and `class-transformer`.
- **CORS Enabled**: Pre-configured to accept requests from your Vite frontend (`http://localhost:5173` etc.).
- **Automatic Fallback Transporter**: If SMTP credentials are not yet configured in `.env`, the service safely initializes an Ethereal/mock transport so it never crashes during development.

---

## Getting Started

### 1. Configure SMTP Credentials

Create or edit `server/.env`:

```env
PORT=5000

# SMTP Mailer Settings (e.g. Gmail, Outlook, SendGrid, Mailtrap)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sshreyas471@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM="Shreya's Portfolio" <sshreyas471@gmail.com>
SMTP_TO=sshreyas471@gmail.com
```

> **Tip for Gmail Users**:
> Enable 2-Step Verification on your Google Account and generate an **App Password** (Google Account -> Security -> App passwords) to use as `SMTP_PASS`.

---

### 2. Run the Backend

From the project root:
```bash
# Start in development mode (with hot-reloading)
npm run server:dev

# Or build and start production bundle
npm run server:build
npm run server
```

Or from the `server` directory:
```bash
cd server
npm run start:dev
```

Server will run on **http://localhost:5000**.

---

## API Endpoints

### `POST /api/contact`
Send a contact message.

**Payload:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Software Engineer Opportunity",
  "message": "Hi Shreya, I'd like to discuss a Full Stack Developer role."
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Message sent successfully via SMTP mailer!",
  "messageId": "<...>"
}
```
