import request from '../utils/request.ts'

const {get} = request

//react的组件方法首字母大写，其他的方法，比如js小写
// 菜单栏
export async function getMuneList(){
  return get('/categories')
}

// 每周上新
export async function getNewList(){
  return get('/products/new')
}

//每日推荐
export async function getDetailRecommend(){
  return get(`/products/recommend`)
}

//热销商品展示
export async function getList(){
  return get(`/products/list`)
}

//商品详情
export async function getDetail(id:number){
  return get(`/products/detail/${id}`)
}
