const express = require("express")
const requireAuth = require("../middleware/requireAuth")

//controllers
const {
    createItem,
    getItems,
    getItem,
    getItemsByCategory,
    deleteItem,
    updateItem
  } = require('../controllers/itemController')

const router  = express.Router()

//require authentication
router.use(requireAuth)

//GET all items
router.get('/', getItems)

//GET a single Item
router.get('/:id', getItem)

//GET items by category
router.get("/cat/:cat", getItemsByCategory)

// POST a new Item
router.post('/', createItem)

// DELETE a Item
router.delete('/:id', deleteItem)

// UPDATE a Item
router.patch('/:id', updateItem)


module.exports = router