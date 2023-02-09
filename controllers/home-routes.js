const router = require('express').Router();
const Budget = require('../models/BudgetTest');

// route to get all dishes
router.get('/', async (req, res) => {
  const goalData = await Budget.findAll().catch((err) => { 
      res.json(err);
    });
      const goals = goalData.map((goal) => goal.get({ plain: true }));
      res.render('all', { goals });
    });

// route to get one goal
router.get('/goal/:id', async (req, res) => {
  try{ 
      const goalData = await Budget.findByPk(req.params.id);
      if(!goalData) {
          res.status(404).json({message: 'No goal with this id!'});
          return;
      }
      const goal = goalData.get({ plain: true });
      res.render('goal', goal);
    } catch (err) {
        res.status(500).json(err);
    };     
});

module.exports = router;
