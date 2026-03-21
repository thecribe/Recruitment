import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // secure SMTP
  secure: true,
  auth: {
    user: "lawaloluwatobi128@gmail.com", // your gmail
    pass: "whvvbaynvbrzykxg", // 16-char app password
  },
});

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: "arisetesting@outlook.com",
    to,
    subject,
    html,
  });
}
