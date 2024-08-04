import nodemailer from "nodemailer";

const sendMail = async (website, email,userId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const unsubscribeLink = `http://${process.env.MY_WEBSITE}/user/unsubscribe/${userId}`;

  const mailOptions = {
    from: "Monitor Your Website",
    to: email,
    subject: `URGENT: Your website ${website} is down!`,
    text: `Dear User,

It appears that your website (${website}) is currently down. Our monitoring system detected the issue and wanted to notify you immediately.

Please take immediate action to check and resolve the issue as soon as possible.

Best regards,
Monitor Your Website Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #d9534f; text-align: center;">URGENT: Your website is down!</h2>
        <p>Dear User,</p>
        <p style="color: #333333;">Our monitoring system has detected that your website (<a href="${website}" target="_blank" style="color: #0275d8;">${website}</a>) is currently experiencing downtime.</p>
        <p style="color: #333333;">Immediate action is required to investigate and resolve the issue to ensure minimal disruption to your services.</p>
        <div style="background-color: #f2dede; padding: 10px; border-left: 5px solid #d9534f; margin-bottom: 20px;">
          <strong style="color: #a94442;">Timestamp:</strong> ${new Date().toLocaleString()}<br>
          <strong style="color: #a94442;">Website URL:</strong> <a href="${website}" target="_blank" style="color: #a94442;">${website}</a><br>
          <strong style="color: #a94442;">Status:</strong> DOWN
        </div>
        <p style="color: #333333;">Please take the necessary steps to resolve this issue immediately.</p>
        <p style="color: #333333;">Best regards,<br>Monitor Your Website Team</p>
        <p>If you no longer wish to receive notifications, please <a href="${unsubscribeLink}">unsubscribe</a>.</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

export default sendMail;
