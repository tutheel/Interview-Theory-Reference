import fakeDb from '../db/fakeDb.js';

function createItem(payload) {
  const item = {
    id: fakeDb.nextId++,
    name: payload.name
  };

  fakeDb.items.push(item);
  return item;
}

function getAllItems() {
  return fakeDb.items;
}

function getItemById(id) {
  return fakeDb.items.find((item) => item.id === id) || null;
}

function updateItem(id, payload) {
  const item = getItemById(id);
  if (!item) {
    return null;
  }

  if (payload.name !== undefined) {
    item.name = payload.name;
  }

  return item;
}

function deleteItem(id) {
  const index = fakeDb.items.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  fakeDb.items.splice(index, 1);
  return true;
}

export { createItem, getAllItems, getItemById, updateItem, deleteItem };
