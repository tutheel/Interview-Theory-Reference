import Item from '../models/Item.js';

async function createItem(payload) {
  const item = await Item.create({ name: payload.name });
  return item;
}

async function getAllItems() {
  return Item.find();
}

async function getItemById(id) {
  return Item.findById(id);
}

async function updateItem(id, payload) {
  return Item.findByIdAndUpdate(id, { name: payload.name }, { new: true });
}

async function deleteItem(id) {
  const result = await Item.findByIdAndDelete(id);
  return result !== null;
}

export { createItem, getAllItems, getItemById, updateItem, deleteItem };
