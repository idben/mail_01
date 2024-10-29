import {resolve} from "node:path"
import express from "express";
import cors from "cors";
import multer from "multer";
import {sendMail} from "./mail.js"

const upload = multer();

let whitelist = ["http://localhost:5500", "http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("不允許傳遞資料"));
    }
  },
};
const app = express();
app.use(cors(corsOptions));
app.use(express.static(resolve(import.meta.dirname, "public")));
// 如果只是將表單 post 進路由規則，沒有設定表單的 enctype，那需要把下面的加上才能解表單
// 不然就是要用 fetch 等 ajax 技術用 FormData 送出
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("首頁");
});

app.get("/mail", (req, res) => {
  res.sendFile(resolve(import.meta.dirname, "public","mail.html"))
});

app.post("/mail", upload.none(), async (req, res) => {
  const { to, subject, text } = req.body;
  let message = '郵件已送出';
  try {
    await sendMail(to, subject, text);
  } catch (error) {
    console.error('發送郵件時發生錯誤:', error);
    message = '發送郵件時發生錯誤';
  }
  res.send(`
    <script>
      alert("${message}");
      window.location.href = "/mail.html";
    </script>
  `);
});

app.listen(3000, () => {
  console.log("server is running @ http://localhost:3000");
});