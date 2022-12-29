import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
//   localforage内にあるキーが"contacts"のものを取得
  let contacts = await localforage.getItem("contacts");
//   contactsに何も入っていない場合は空配列を作成
  if (!contacts) contacts = [];
  if (query) {
    // matchSorter(絞り込みを行う対象の配列 , 抽出条件とする文字列) で絞り込み＆並び替え後の配列が返ってきます
    // contactsオブジェクトのfirstプロパティにqueryに合致する文字列があれば抽出。
    // 次にlastプロパティにqueryに合致する文字列があれば抽出。（keysはオブジェクトのプロパティを指し、左に指定するほど優先度が高い）
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };
  let contacts = await getContacts();
//   contacts配列の中に新規で作成されたcontactが先頭に追加される
  contacts.unshift(contact);
//   localforageにcontacts情報をセットする
  await set(contacts);
  return contact;
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