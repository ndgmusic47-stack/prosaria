import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function sendNotification(subject: string, rows: Record<string, string>) {
  const html = `
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      ${Object.entries(rows).map(([k, v]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;width:160px">${k}</td>
          <td style="padding:8px 12px;border:1px solid #ddd">${v}</td>
        </tr>`).join('')}
    </table>
  `
  await transporter.sendMail({
    from: `"Prosaria Website" <${process.env.GMAIL_USER}>`,
    to: 'hello@prosaria.co.uk',
    subject,
    html,
  })
}
