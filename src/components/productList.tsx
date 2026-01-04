import {add} from "../import.ts";
import {BASEURL} from "../utils/request.ts";
import {Link} from "react-router-dom";
import type {NewArrival} from "../views";

export default function ProductList({totalList} : {totalList?: NewArrival[]}){

  if(!totalList){
    return <>
      <div>数据为空</div>
    </>
  }

  return (
    <>
      <div className="flex flex-wrap px-4 gap-2 pb-4">
        {
          totalList.map((item) => (
            // 每个商品都是一个Link组件，点击跳转到详情页
            <Link key={item.id} to={`/details/${item.id}`} className="mt-2 flex flex-col w-41.5 items-center gap-1 rounded-lg  relative bg-white">
              <img className="h-41.5" src={BASEURL + item.image_url} alt={item.name}/>
              <div className="p-2 flex w-full flex-col">
                <span className="text-[15px] font-bold truncate">{item.name}</span>
                <div className="text-[16px] text-[#E63232]">
                  <span className="text-[11px]">￥</span>{parseFloat(item.base_price).toFixed(1)}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-7 bg-linear-to-r from-[#12A8FF] to-[#55F2B3]
                            flex items-center justify-center rounded-tl-lg rounded-br-lg">
                <img className="w-4 h-4" src={add} alt=""/>
              </div>

            </Link>
          ))
        }
      </div>
    </>
  )
}