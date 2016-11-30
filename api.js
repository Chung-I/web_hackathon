import { Router } from 'express';
import fetch from 'isomorphic-fetch';

const router = new Router();
const data = {
  startDate: '2016-12-01',
  endDate: '2016-12-11',
  startHour: '8',
  endHour: '21',
};

function PTTParser(pttHTML) {
  let el = document.createElement( 'html' );
  el.innerHTML(pttHTML);
  let articleMetaValue = el.getElementsByClassName('article-meta-value');
}

// Write your restful api here:
router.get('/', (req, res) => {
  res.render('index', { title: '首頁' });
});

router.get('/:board', (req, res) => {
  let url = 'https://www.dcard.tw/_api/forums/' + req.params.board + 'posts?popular=false';
  console.log(url);
  res.json(url);
});

router.get('/:board/:id', (req, res) => {
  let url = 'https://www.ptt.cc/bbs/' + req.params.board + '/' + req.params.id + '.html';
  fetch(url).then(res => res.text())
  .then(text => {
    console.log(text);
    res.json(text);
  });
});

router.get('/form/leon', (req, res) => {
  res.json(data);
});

router.post('/form/json', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

router.use((req, res) => {
  res.send('404');
});

export default router;
