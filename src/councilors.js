import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from "axios"

export async function getCouncilors(){
 const res = await axios.get(`http://localhost:1323/councilors`)
 const councilors = res.data
 return councilors
}

export async function getCategoryList(){
  let res = await axios.get(`http://localhost:1323/category`)
const categorylist = res.data
  return categorylist
}

export async function getCouncilor(id){
  let res = await axios.get(`http://localhost:1323/councilor/${id}`)
  const councilor = res.data
  return councilor
}

export async function getQuestions(id){
  let res = await axios.get(`http://localhost:1323/questions/${id}`)
  const questions = res.data
  return questions
}

export async function getQuestionsByCategory(category){
  let res = await axios.get(`http://localhost:1323/questions/${category}`)
  const questions = res.data
  return questions
}


export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === id);
  if (!contact) throw new Error("No contact found for", id);

//   contactにある情報をupdataesにある情報に書き換える（参照ではなく値そのものを書き換える）
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    // index番目を開始位置としてそこから１つ要素を削除する
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}