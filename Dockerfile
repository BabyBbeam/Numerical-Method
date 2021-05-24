# เลือกใช้ node เวอร์ชั่น 14
FROM node:14

# กำหนดโฟล์เดอร์งาน
WORKDIR /app

# เอาไฟล์งานไปใส่ใน Docker (ยกเว้น ไฟล์ที่กำหนดไว้ใน .dockerignore)
COPY . .

# ติดตั้ง package ที่ใช้ในไฟล์งานของเรา
RUN npm install

EXPOSE 3001

# สั่งรันหน้าเว็บไซต์ใน Docker เมื่อกดปุ่ม start
CMD ["npm","start"]

# คำสั่งสร้าง image ชื่อ docter-beam
## docker build -t docter-beam .

# คำสั่งรัน image docter-beam
## docker run -rm -d -p 3000:3000 docter-beam