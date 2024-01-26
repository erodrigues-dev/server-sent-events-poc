const { Router } = require('express');

const router = new Router();

router.get('/api/samples', (_req, res) => {
  res.json([{ id: 1 }, { id: 2 }]);
});

module.exports = router;
