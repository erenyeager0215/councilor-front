import axios from "axios";

export async function getCouncilors() {
  const res = await axios.get(`http://localhost:1323/councilors`);
  const councilors = res.data;
  return councilors;
}

export async function getCategoryList() {
  let res = await axios.get(`http://localhost:1323/category`);
  const categorylist = res.data;
  return categorylist;
}

export async function getCouncilor(id) {
  let res = await axios.get(`http://localhost:1323/councilor/${id}`);
  const councilor = res.data;
  return councilor;
}

export async function getQuestions(id) {
  let res = await axios.get(`http://localhost:1323/questions/${id}`);
  const questions = res.data;
  return questions;
}

export async function getQuestionsByCategory(category) {
  let res = await axios.get(`http://localhost:1323/questions/${category}`);
  const questions = res.data;
  return questions;
}
