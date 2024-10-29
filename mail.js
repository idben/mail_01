import nodemailer from "nodemailer";

// 建立 SMTP 傳輸器，使用 Gmail 和應用程式密碼進行驗證
// 從以下網址取得中的設定及管理應用程式密碼來取得 16 位數的應用程式密碼
// 這裡的密碼不是個人的帳號密碼，請注意
// https://support.google.com/mail/?p=InvalidSecondFactor
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_ACCOUNT,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
});

// 定義並導出 `sendMail` 函式
export async function sendMail(to, subject, text) {
  const mailOptions = {
    from: process.env.GOOGLE_APP_ACCOUNT,
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('郵件發送成功:', info.messageId);
    return info;
  } catch (error) {
    console.error('郵件發送失敗:', error);
    throw error;
  }
}