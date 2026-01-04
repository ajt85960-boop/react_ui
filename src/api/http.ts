import request from "../utils/request.ts";

const { get } = request

export async function getList(){
  return get('/categories')
}

export async function getNewList() {
  return get('/products/new')
}