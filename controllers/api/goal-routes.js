const router = require('express').Router();
const Budget = require('../../models/Budget');

// route to create/add a goal using async/await
router.post('/', async (req, res) => {
  try { 
    const goalData = await Budget.create({
    category: req.body.category,
    amount: req.body.amount,
  });
  // if the dish is successfully created, the new response will be returned as json
  res.status(200).json(goalData)
} catch (err) {
  res.status(400).json(err);
}
});


module.exports = router;
