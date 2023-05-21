import { useState, useCallback } from "react";
import axios from "axios";

export const useAllCouncilors = () => {
  const [councilors, setCouncilors] = useState([]);

  async function getCouncilors() {
    const res = await axios.get(`http://18.183.142.189:8080/councilors`);
    setCouncilors(res.data);
  }
  return { getCouncilors, councilors };
};
