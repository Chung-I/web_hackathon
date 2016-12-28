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
  try {
    const form = await Form.create(req.body);
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
