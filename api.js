import { Router } from 'express';
import bodyParser from 'body-parser';
import { Form } from './src/models/form';

const router = new Router();

router.use(bodyParser.json());


// Write your restful api here:
router.get('/', (req, res) => {
  res.render('index', { title: '首頁' });
});


router.get('/form/:eventName', (req, res) => {
  const eventName = req.params.eventName;
  fs.readFile(`${eventName}.json`, 'utf-8', (err, jsonData) => {
    if (err) throw err;
    res.json(jsonData);
  });
});

router.post('/form', async (req, res) => {
  function randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }

  const resultUrl = randomString(6, '045cdTWXef132ijklUVmn67opLMghNqrRSYuZEFstvxO89yzABCDabGHwIJKPQ');
  const fillFormUrl = randomString(6, '4st5cdTef1032ikVCWXFjvUn67opLMghNDaqrRPQmSYuZExO89yzABbGHwIJKl');
  console.log(resultUrl);
  console.log(fillFormUrl);
  const body = req.body;
  body.resultUrl = resultUrl;
  body.fillFormUrl = fillFormUrl;
  console.log(body);
  try {
    const form = await Form.create(body);
    res.json(form);
  } catch (err) {
    console.log(err);
  }
});


router.put('/form/:eventName/:userName', (req, res) => {
  const eventName = req.params.eventName;
  fs.readFile(`${eventName}.json`, 'utf-8', (rerr, jsonData) => {
    if (rerr) throw rerr;
    jsonData.userData.push(req.body.userData);
    fs.writeFile(`${eventName}.json`, JSON.stringify(jsonData), werr => {
      if (werr) throw werr;
      res.json(jsonData);
    });
  });
});


router.use((req, res) => {
  res.send('404');
});

export default router;
