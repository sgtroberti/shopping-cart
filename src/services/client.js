import { dataMock } from "../providers/dataMock";

export const getRenderData = () => dataMock;

export const saveData = (cart) =>
  localStorage.setItem("cart", JSON.stringify(cart));

export const getData = () =>
  JSON.parse(localStorage.getItem("cart")) || dataMock;
