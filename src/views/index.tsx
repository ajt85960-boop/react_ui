import banner from '../assets/banner.png'
import {right} from '../import.ts'
import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Menus from "../components/items.tsx";
import ProductList from "../components/productList.tsx";
import {getNewList, getDetailRecommend, getList} from "../api/http.ts";
import {BASEURL} from "../utils/request.ts";

export interface NewArrival {
  "id": number,
  "category_id": number,
  "name": string,
  "description": string,
  "base_price": string,
  "is_new_arrival": number,
  "is_daily_recommend": number,
  "status": number,
  "product_id": number,
  "image_url": string,
}

export default function Index() {


  // const [item] = useState([
  //   {img: item1, price: 1200},
  //   {img: item2, price: 1500},
  //   {img: item3, price: 1300},
  // ])

  const [loading, setLoading] = useState(true);

  const [item, setItem] = useState<NewArrival[]>([])
  const [recommend, setRecommend] = useState<NewArrival[]>([])
  const [totalList, setTotalList] = useState<NewArrival[]>([])

  // 缓存函数，只创建一次，防止每次组件重新渲染时都创建新的函数引用
  // 当这个函数被 useEffect 依赖时，如果不缓存，会导致无限循环
  // [] 表示函数内部不依赖任何外部变量：只在组件挂载时执行一次
  const getItems = useCallback(async () => { //函数缓冲器
    try {
      setLoading(true);

      const resNewList = await getNewList()
      const resDetail = await getDetailRecommend()
      const total = await getList()

      const list = resNewList.data as NewArrival[]; //TypeScript 知道 list 是 NewArrival[] 类型
      setItem(list);
      setRecommend(resDetail.data as NewArrival[]);
      setTotalList(total.data as NewArrival[]);

    } finally {
      setLoading(false);
    }
  }, [])
  
//  相当于 Vue 的 onMounted
//  依赖数组 [getItems] 确保只有当 getItems 变化时才重新执行
//  因为 getItems 被 useCallback 缓存且依赖为空，一直不会创建新的，所以只执行一次（在组件挂载时）
  useEffect(() => { // 副作用执行器
    void getItems()
  },[getItems])

  return (
    <>
      <div className='h-screen overflow-y-scroll pb-20.75'>
        <header className="sticky top-0 h-15 bg-linear-to-b from-[#BFE8FF] to-white
                                    flex items-center justify-center z-50">
          <div className="font-bold text-gray-800">
            首页
          </div>
        </header>
        <main className="px-2 mt-1">
          <div>
            <img src={banner} alt='' className=""/>
          </div>
          <Menus active={false}></Menus>
          <div
            className="relative bg-white pb-3 mt-4 rounded-lg p-2 bg-linear-to-b from-[rgba(191,232,255,0.5)] via-[white] to-[#FFFFFF]">
            <div className="flex gap-2 ">
                <span className="font-bold">
                  每周
                  <span className="text-(--primary)">上新</span>
                </span>
              <span
                className='text-[10px] border border-(--primary) p-1 rounded-full rounded-bl-md text-(--primary)'>
                  上新价格优惠购
                </span>
            </div>
            <span className="bg-linear-to-r from-[#12A8FF] to-[#55f283] absolute
                               right-0 top-0 w-fit h-fit text-xs p-2 rounded-tr-lg rounded-bl-2xl">
                  <span className="text-[#FFEB3B]">新品特惠</span>
                  <span className="text-[#FFFFFF]"> 查看更多</span>
              </span>
            {
              loading ? <div>loading</div> : <Item list={item}/>
            }

          </div>

          <div className="flex justify-around mt-4">
            <Recommend recommend={recommend}/>
          </div>
          <List totalList={totalList}/>
        </main>
      </div>
    </>
  )
}


function Item({list}: { list: NewArrival[] }) {
  return <>
    <div className="flex justify-between mt-2">
      {
        list.map((item, i) => (
          <Link key={i} to={`/details/${item.id}`} className="relative w-25 pb-1 bg-[#F5F5F5] rounded-xl">
            <div className="absolute top-2 left-1.5 text-white text-[8px] rounded-sm p-0.5
                    bg-linear-to-r from-[#12A8FF] to-[#55f283]">
              上新
            </div>
            <img src={BASEURL + item.image_url} alt='' className='w-25 h-25'></img>
            <div className="text-md font-bold px-2 ">
              <span className="text-xs">￥</span>{Number(item.base_price)}
            </div>
            <span className="w-6.25 h-6.25 absolute bottom-0 right-0 text-xs rounded-full
                  border border-amber-500 text-[#DB6E00]
                  flex items-center justify-center rounded-bl-md
                  bg-linear-to-r from-[#F0C686] to-[#FFE9C4] font-bold">
       抢
     </span>
          </Link>
        ))
      }
    </div>
  </>
}

function Recommend({recommend} : {recommend : NewArrival[]}) {
  return (
    <>
      <div
        className="rounded-[15px] w-41.5 h-36 bg-linear-to-b from-[rgba(215,255,191,0.5)] via-white to-[#FFFFFF]">
        <div className="flex items-center gap-2 font-bold p-2">
          <span className="text-[14px] ">每天推荐</span>
          <span className="text-[10px] text-white bg-linear-to-r from-[#12A8FF] to-[#55F2B3]
                             rounded-full rounded-bl-md p-0.5 px-1">限时活动 超值</span>
        </div>
        <div  className="flex items-center gap-2 px-2">
        {
          recommend.map((item, i) => (
            //<div>改成<Link> 路由跳转
              <Link key={i} to={`/details/${item.id}`} className="flex flex-col items-center justify-center gap-2">
                <div
                  className="w-17.5 h-17.5 flex items-center justify-center rounded-[15px] border border-[rgba(163,221,255,1)]">
                  <img className="w-12.5 h-17.75" src={BASEURL + item.image_url} alt=''/>
                </div>
                <span className="text-xs">{item.name}</span>
              </Link>
          ))
        }
        </div>

      </div>
      <div
        className="rounded-[15px] w-41.5 h-36 bg-linear-to-b from-[rgba(191,255,227,0.5)] via-white to-[#FFFFFF]">
        <div className="flex items-center gap-2 font-bold p-2">
          <span className="text-[14px] ">推荐榜单</span>
          <span className="text-[10px] text-white bg-linear-to-r from-[#12A8FF] to-[#55F2B3]
                             rounded-full rounded-bl-md p-0.5 px-1">跟着大家一起买</span>
        </div>
        <div className="flex items-center gap-2 px-2">
          {
            recommend.map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-2">
                <div
                  className="w-17.5 h-17.5 flex items-center justify-center rounded-[15px] border border-[rgba(163,221,255,1)]">
                  <img className="w-12.5 h-17.75" src={BASEURL + item.image_url} alt=''/>
                </div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))
          }

        </div>
      </div>
    </>
  )
}


function List({totalList} : {totalList: NewArrival[]}) {

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <span className="text-[17px] font-bold">热销商品 HOT SALE</span>
          <span className="text-[13px] text-[#666666] flex items-center gap-2">
              全部商品 <img className="w-2 h-2" src={right} alt=''/></span>
        </div>
        <ProductList totalList={totalList} />
      </div>
    </>
  )
}