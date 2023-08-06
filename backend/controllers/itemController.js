const Item = require("../models/itemsModel")
const mongoose = require("mongoose")

const checkAuth = (arr, user_id) => {
  const tmp = []
  arr.map(item=> {
    if (item.user_id === user_id) {
      console.log("true");
      console.log(item)
      item.auth = 1
      tmp.push(item)
      console.log(tmp)
    } else {
      console.log("false")
      item.auth = 0
      tmp.push(item)
    }
  })
  return tmp
}

const getItems = async(req, res) => {
    const items = await Item.find({}).sort({createdAt: -1})
    const user_id = await req.user.id
    console.log(user_id)
    const jsonRet = await checkAuth(items,user_id)
    res.status(200).json(jsonRet)
}

const getItem = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such item'})
    }

    const item = await Item.findById(id)

    if (!item) {
        return res.status(404).json({error: 'No such item'})
    }
    const auth = item.user_id === req.user._id
    res.status(200).json({...item, auth})
}

const getItemsByCategory = async(req, res) => {
    const { cat } = req.params

    const items = await Item.find({category: cat})

    if (!items) {
        return res.status(404).json({error: 'Please enter a valid category'})
    }
    const user_id = req.user.id
    res.status(200).json(checkAuth(items,user_id))
}

const createItem = async (req, res) => {
    const {title, price, sellerName, category, desc} = req.body
  
    let emptyFields = []
  
    if(!title) {
      emptyFields.push('title')
    }
    if(!price) {
      emptyFields.push('price')
    }
    if(!sellerName) {
      emptyFields.push('sellerName')
    }
    if(!category) {
      emptyFields.push('category')
    }
    if(!desc) {
      emptyFields.push('desc')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
  
    // add doc to db
    try {
      const user_id = req.user.id
      console.log(user_id)
      const item = await Item.create({title, price, sellerName, category, desc, user_id, auth: 1})
      res.status(200).json(item)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params
    console.log(id)
    console.log("herrr");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such item'})
    }
    console.log("hooo");
    const item = await Item.findOneAndDelete({_id: id})

    if (!item) {
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
}
  
  // update an item
const updateItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such item'})
    }
    if (req.body.user_id===req.user.id) {
        const item = await Item.findOneAndUpdate({_id: id}, {
            ...req.body
        })
    
        if (!item) {
            return res.status(400).json({error: 'No such item'})
        }
    
        res.status(200).json(item)
    } else {
        res.status(500).json({error: "Request not authorized"})
    }
}

module.exports = {
    getItems,
    getItem,
    getItemsByCategory,
    createItem,
    updateItem,
    deleteItem
}