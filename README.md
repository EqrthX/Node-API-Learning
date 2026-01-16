# Project สำหรับฝึกทำ API ง่ายๆ เพื่อเรียนรู้การทำงานของ Backend ว่าควรทำอะไรบ้าง
### - ถ้าเราจะออกแบบ Software ตัวนึงควรวางโครงสร้างของ Project ไว้ให้ดี
### - ไม่ควร Hard Query ในฝั่งของ Services | Controllers มันจะทำให้ไม่ปลอดภัยและเขียนซ้ำๆไปเรื่อยๆ
### - ควรแยก SQL Query แยกออกมาเป็นประจำของ Services | Controllers นั้นๆ
### - ควรวางโครงสร้าง Server และ Database ดีๆ เมื่อเวลา Develop ใช้ Local ได้แต่พอขึ้น Production มันจะทำให้ error เต็มไปหมด
### - การเขียน module ต่างๆ ควรทำ Test Case ไว้ด้วยเพราะว่าเป็นการ Test ว่า Module หลุดจาก test case ไหม 
### - หลังจากตัวเองเขียน test case ทำให้รู้ว่าการวางแผนการเขียน โครงสร้าง database ยังไม้ดีเท่าที่ควร ควรฝึกโครงสร้างโปรเจคให้ดีกว่านี้
### - Deploy ขึ้น Vercel หรือ Cloud อื่นๆ ควรจะแตก branch และค่อย merge เข้า branch  หลักเพื่อ Deploy
### - Database Local จะไม่สามารถใช้ได้จำเป็นต้องหาใช้ database cloud ฟรีและไป enviroment ใน vercel 
### - การใช้ Docker ในการ Develop โปรเจคต่างๆเราควรวางโครงสร้างไม่ต่างจาก Local เท่าไหร่
### - แต่ก็ควรเขียน Dockerfile เพื่อเลือก image ในการทำฝั่ง server client 
### - เขียน Docker-compose เพื่อสั่งการทำงานทั้งหมด Client Server Database ควรเรียงลำดับดีๆ
### - การทำงาน Backend ควรใช้ postman เป็นเพราะเราต้องทดสอบ API ที่เราเขียนขึ้นมา
### - อย่าลืมทำ API Spec ให้กับฝ่ายอื่นเพื่อให้เขาทำงานต่อได้ API Spec ควรอ่านง่าย