import banner from '../assets/banner.png'
import {item1, item2, item3, item4, item5, right} from '../import.ts'
import {useState} from "react";
import Menus from "../components/items.tsx";
import ProductList from "../components/productList.tsx";

export default function Index() {


  const [item] = useState([
    {img: item1, price: 1200},
    {img: item2, price: 1500},
    {img: item3, price: 1300},
  ])

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
                  每日
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
            <Item list={item}/>
          </div>

          <div className="flex justify-around mt-4">
            <Recommend/>
          </div>
          <List/>
        </main>
      </div>
    </>
  )
}

interface ItemProps {
  img: string,
  price: number
}

function Item({list}: { list: ItemProps[] }) {
  return <>
    <div className="flex justify-between mt-2">
      {
        list.map((item, i) => (
          <div key={i} className="relative w-25 pb-1 bg-[#F5F5F5] rounded-xl">
            <div className="absolute top-2 left-1.5 text-white text-[8px] rounded-sm p-0.5
                    bg-linear-to-r from-[#12A8FF] to-[#55f283]">
              上新
            </div>
            <img src={item.img} alt='' className='w-25 h-25'></img>
            <div className="text-md font-bold px-2 ">
              <span className="text-xs">￥</span>{item.price}
            </div>
            <span className="w-6.25 h-6.25 absolute bottom-0 right-0 text-xs rounded-full
                  border border-amber-500 text-[#DB6E00]
                  flex items-center justify-center rounded-bl-md
                  bg-linear-to-r from-[#F0C686] to-[#FFE9C4] font-bold">
       抢
     </span>
          </div>
        ))
      }
    </div>
  </>
}

function Recommend() {
  return (
    <>
      <div
        className="rounded-[15px] w-41.5 h-36 bg-linear-to-b from-[rgba(215,255,191,0.5)] via-white to-[#FFFFFF]">
        <div className="flex items-center gap-2 font-bold p-2">
          <span className="text-[14px] ">每天推荐</span>
          <span className="text-[10px] text-white bg-linear-to-r from-[#12A8FF] to-[#55F2B3]
                             rounded-full rounded-bl-md p-0.5 px-1">限时活动 超值</span>
        </div>
        <div className="flex items-center gap-2 px-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="w-17.5 h-17.5 flex items-center justify-center rounded-[15px] border border-[rgba(163,221,255,1)]">
              <img className="w-12.5 h-17.75" src={item4} alt=''/>
            </div>
            <span className="text-xs">酷炫音响</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="w-17.5 h-17.5 flex items-center justify-center rounded-[15px] border border-[rgba(163,221,255,1)]">
              <img className="w-11.25 h-15.5" src={item5} alt=''/>
            </div>
            <span className="text-xs">头戴式耳机</span>
          </div>
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
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="w-17.5 h-17.5 flex items-center justify-center rounded-[15px] border border-[rgba(163,221,255,1)]">
              <img className="w-12.5 h-17.75" src={item4} alt=''/>
            </div>
            <span className="text-xs">酷炫音响</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="w-17.5 h-17.5 flex items-center justify-center rounded-[15px] border border-[rgba(163,221,255,1)]">
              <img className="w-11.25 h-15.5" src={item5} alt=''/>
            </div>
            <span className="text-xs">头戴式耳机</span>
          </div>
        </div>
      </div>
    </>
  )
}


function List() {

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <span className="text-[17px] font-bold">热销商品 HOT SALE</span>
          <span className="text-[13px] text-[#666666] flex items-center gap-2">
              全部商品 <img className="w-2 h-2" src={right} alt=''/></span>
        </div>
        <ProductList />
      </div>
    </>
  )
}