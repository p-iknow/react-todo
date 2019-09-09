const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.set({ 'Content-Type': 'application/json' });

  const result = {
    statusCode: 200,
    body: [
      {
        title: '공부하기',
        id: 1233,
        status: 'todo'
      },
      {
        title: '스터디준비',
        id: 1234,
        status: 'todo'
      },
      {
        title: '알고리즘공부',
        id: 1230,
        status: 'todo'
      },
      {
        title: '컴퓨터게임',
        id: 1231,
        status: 'todo'
      }
    ]
  };

  res.json(result);
});

module.exports = router;
