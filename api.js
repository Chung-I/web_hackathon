import { Router } from 'express';
import bodyParser from 'body-parser';
import { Form } from './src/models/form';

const router = new Router();

router.use(bodyParser.json());


// Write your restful api here:


router.get('/form', async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

router.get('/form/:eventUrl', async (req, res) => {
  const url = req.params.eventUrl;
  let form;
  try {
    form = await Form.findOne({ eventUrl: url });
  } catch (err) {
    console.log(err);
  }
  res.json(form);
});

router.post('/form', async (req, res) => {
  function randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; i--) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }

  const eventUrl = randomString(6, '045cdTWXef132ijklUVmn67opLMghNqrRSYuZEFstvxO89yzABCDabGHwIJKPQ');
  const adminUrl = randomString(6, '4st5cdTef1032ikVCWXFjvUn67opLMghNDaqrRPQmSYuZExO89yzABbGHwIJKl');
  const body = req.body;
  body.eventUrl = eventUrl;
  body.adminUrl = adminUrl;
  try {
    const form = await Form.create(body);
    res.json(form);
  } catch (err) {
    console.log(err);
  }
});


router.put('/form/:eventUrl', async (req, res) => {
  const query = {
    eventUrl: req.params.eventUrl
  };
  let form;
  try {
    form = await Form.findOneAndUpdate(query, {
      ...req.body
    }, { new: true });
  } catch (err) {
    console.log(err);
  }
  res.json(form);
});


router.use((req, res) => {
  res.send('404');
});

export default router;
