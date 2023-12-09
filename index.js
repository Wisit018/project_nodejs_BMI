const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

function calculateBMI(weight, height) {
  height = height / 100;
  const bmi = weight / (height * height);
  return bmi;
}

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/calculate', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
    res.render('index', { error: 'โปรดป้อนน้ำหนักและส่วนสูงให้ถูกต้อง' });
    return;
  }

  const bmi = calculateBMI(weight, height);
  let bmiCategory = '';
  let bmiDescription = '';

  if (bmi < 18.5) {
    bmiCategory = 'น้ำหนักน้อย (ผอม)';
    bmiDescription = 'คุณมีน้ำหนักน้อยเกินไป ควรพยายามรับประทานอาหารที่เหมาะสมและเพิ่มปริมาณอาหาร';
  } else if (bmi < 24.9) {
    bmiCategory = 'ปกติ';
    bmiDescription = 'น้ำหนักของคุณอยู่ในเกณฑ์ปกติ คงควรรักษาระดับน้ำหนักนี้';
  } else if (bmi < 29.9) {
    bmiCategory = 'ท้วม';
    bmiDescription = 'คุณมีน้ำหนักเกินมาตรฐาน ควรเริ่มต้นการออกกำลังกายและการควบคุมอาหาร';
  } else {
    bmiCategory = 'อ้วน';
    bmiDescription = 'คุณมีน้ำหนักมากเกินไป ควรปรับเปลี่ยนพฤติกรรมทางอาหารและเริ่มต้นการออกกำลังกาย';
  }

  res.render('result', {
    bmiResult: bmi.toFixed(2),
    category: bmiCategory,
    description: bmiDescription,
  });
});

app.get('/features', (req, res) => {
  res.render('features');
});

app.get('/pricing', (req, res) => {
  res.render('pricing');
});

app.get('/faqs', (req, res) => {
  res.render('faqs');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
