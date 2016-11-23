import { Router } from 'express';
import fetch from 'isomorphic-fetch';

const router = new Router();
const data = {
  users: [
  { avatar: 'http://xxx.com', name: 'John', age: 23 },
  { avatar: 'http://xxx.com', name: 'Amy', age: 18 },
  ]
};

function PTTParser(pttHTML) {
  let el = document.createElement( 'html' );
  el.innerHTML(pttHTML);
  let articleMetaValue = el.getElementsByClassName('article-meta-value');
  let 

}

// Write your restful api here:
router.get('/', (req, res) => {
  res.render('index', { title: '首頁' });
});

router.get('/:board', (req, res) => {
  let url = 'https://www.ptt.cc/bbs/' + req.params.board + '/index.html';
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

router.use((req, res) => {
  res.send('404');
});

export default router;
