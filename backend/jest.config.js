// jest.config.js
module.exports = {
  testEnvironment: 'node',
  
  // บอกให้ Jest หาไฟล์นามสกุล .js หรือ .jsx
  moduleFileExtensions: ['js', 'json', 'jsx'],
  
  // บอกให้หาไฟล์ test ที่อยู่ในโฟลเดอร์ __tests__ และลงท้ายด้วย .test.js
  testMatch: ['**/__tests__/**/*.test.js'],
  
  // (Optional) ถ้าโปรเจกต์ไม่ได้ใช้ Alias (@/...) ก็ลบส่วน moduleNameMapper ออกได้เลย
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1',
  // },
};