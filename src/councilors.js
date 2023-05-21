import axios from "axios";

export async function getCouncilors() {
  const res = await axios.get(`http://18.183.142.189:8080/councilors`);
  const councilors = res.data;
  return councilors;
}

export async function getCategoryList() {
  let res = await axios.get(`http://18.183.142.189:8080/category`);
  const categorylist = res.data;
  console.log(res.data);
  return categorylist;
}

export async function getCouncilor(id) {
  let res = await axios.get(`http://18.183.142.189:8080/councilor/${id}`);
  const councilor = res.data;
  return councilor;
}

export async function getQuestions(id) {
  let res = await axios.get(`http://18.183.142.189:8080/questions/${id}`);
  const questions = res.data;
  return questions;
}

export async function getQuestionsByCategory(category) {
  let res = await axios.get(`http://18.183.142.189:8080/questions/${category}`);
  const questions = res.data;
  return questions;
}
