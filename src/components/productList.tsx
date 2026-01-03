import {add, toner} from "../import.ts";

export default function ProductList(){

  return (
    <>
      <div className="flex flex-wrap px-4 gap-2 pb-4">
        {
          [1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="mt-2 flex flex-col w-41.5 items-center gap-1 rounded-lg  relative bg-white">
              <img className="h-41.5 " src={toner} alt=""/>
              <div className="p-2 flex  w-full flex-col">
                <span className="text-[15px] font-bold">紧致抗初老水乳套装...</span>
                <div className="text-[16px] text-[#E63232]">
                  <span className="text-[11px]">￥</span>199<span className="text-[13px]">.9</span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-7 bg-linear-to-r from-[#12A8FF] to-[#55F2B3]
                            flex items-center justify-center rounded-tl-lg rounded-br-lg">
                <img className="w-4 h-4" src={add} alt=""/>
              </div>

            </div>
          ))
        }
      </div>
    </>
  )
}