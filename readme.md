# 使用 google 做為 SMPT 在 nodejs 專案中寄件
## 說明
1. [參考這篇並申請應用程式密碼](https://support.google.com/accounts/answer/185833?visit_id=638657618847557084-425259334&p=InvalidSecondFactor&rd=1)，密碼應該為 16 位數的字串
2. 將 `config.env.template` 的 `.template` 刪除，將你的寄件帳號及應用程式密碼記錄在這環境變數檔案中
3. `mail.js` 中使用了套件 `nodemailer` 做為寄件方法，並會讀取環境參數的組帳號與密碼，導出 sendMail 以供使用
4. 因此在 index.js 中，路由規則 `post /mail` 收到內容時，就會使用這個方法寄件