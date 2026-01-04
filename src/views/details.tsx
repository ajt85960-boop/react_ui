import details from '../assets/product/details.png'
import right from '../assets/icons/right.png'
import {useParams} from "react-router-dom";
import share from '../assets/icons/share.svg'
import car from '../assets/icons/car.svg'
import close from '../assets/icons/close.svg'
import {useEffect, useState} from "react";
import left from '../assets/icons/left.svg'

export default function Details() {
  const {id} = useParams<{ id: string }>();

  const [showPopup, setShowPopup] = useState<boolean>(false);

  console.log(id)

  function back(){
    window.history.back()
  }

  return <>
    <div className='h-screen overflow-y-scroll pb-20.75'>
      <header className="sticky top-0 h-15 bg-white flex items-center z-50 px-4">
        <div className="flex-1">
          <img src={left} alt="" onClick={back} />
        </div>
        <div className="flex-1 text-center font-bold text-gray-800">
          爆款好物
        </div>
        <div className="flex-1">

        </div>
      </header>
      <main className="mt-1 relative">
        <div className="h-93.75 relative">
          <img src={details} className="w-full h-full" alt=""/>
          <div className="absolute bottom-6 right-3 px-3 py-1 rounded-full
                bg-white/50 backdrop-blur-lg
                border border-white/80 shadow-sm
                text-xs text-black font-medium">
            1 / 5
          </div>
        </div>
        <div className="px-4 w-full -mt-5 absolute ">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm flex justify-between">
              <span className="text-[#E63232] font-bold">￥199.9</span>
              <span>库存123</span>
            </div>
            <p className="font-bold text-[17px]">
              紧致抗初老水乳套装补水浸透面膜
            </p>
            <span className="text-gray-500 text-xs">
              补水面膜丨轻感浸透
            </span>
          </div>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3 mt-2">
            <div className="flex" onClick={() => setShowPopup(true)}>
              <div className="text-gray-500 text-sm w-[12%]">规格</div>
              <div className="text-sm text-[#383838] flex items-center justify-between flex-1">
                <span>规格/套餐</span>
                <img className="w-2 h-3" src={right} alt=""/>
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-sm w-[12%]">发货</div>
              <div className="text-sm text-[#383838]">
                广东广州 丨 48小时内发货
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-sm w-[12%]">运费</div>
              <div className="text-sm text-[#383838]">
                免运费（请以提交订单为准）
              </div>
            </div>
            <div className="text-gray-500 text-xs">
              售后无忧 · 品质保证 · 极速退款
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full h-20.75 fixed px-4 bottom-0 flex justify-around items-center bg-white">
        <div className="w-[30%] px-4 flex gap-4">
          <img src={share} alt=""/>
          <div className="relative">
            <img src={car} className="" alt=""/>
            <span className="absolute -top-1 -right-1
            text-[10px] flex items-center justify-center
            w-2.75 h-2.75 rounded-full font-bold
            bg-[#FF0000] text-white">
              2
            </span>
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="bg-[#53EFB6] text-white flex-1
            p-2 px-4 rounded-tl-full rounded-bl-full
            flex items-center justify-center
          ">
            加入购物车
          </div>
          <div className="bg-[#15ACFB] text-white flex-1
            p-2 px-4 rounded-tr-full rounded-br-full
            flex items-center justify-center
          ">
            立即购买
          </div>
        </div>
      </footer>

      {showPopup && <Popup onClose={() => setShowPopup(false)}/>}
    </div>
  </>
}

function Popup({onClose}: { onClose: () => void }) {
  const [active, setActive] = useState(false);

  // 组件挂载后，延迟一小会儿触发“进入”动画
  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // 执行“退出”动画，动画结束后再真正调用 onClose
  const handleClose = () => {
    setActive(false);
    setTimeout(onClose, 300); // 这里的 300ms 需与 CSS transition 时间一致
  };

  return <>
    <div className="bg-black/40 fixed top-0 bottom-0 w-full z-50" onClick={handleClose}></div>
    <div className={`w-full bg-white fixed bottom-0 z-50
          rounded-tl-3xl rounded-tr-3xl p-4 flex flex-col gap-4
          popup-container ${active ? 'popup-show' : ''}
        `}>
      <div className="flex items-start justify-between">
        <div className="flex gap-2 items-center">
          <img src={details} className="w-21 h-21 rounded-lg" alt=""/>
          <div className="flex flex-col gap-1">
            <span className="text-[#E63232] font-bold">￥199.9</span>
            <span className="text-[#999999] text-xs">库存123</span>
          </div>
        </div>
        <img src={close} alt='' className="w-4 h-4" onClick={handleClose}/>
      </div>
      <div>
        <span className="text-[#999999] text-sm">套餐类型</span>
        <div className="flex justify-around py-2">
          {
            ['2.5kg', '5kg', '10kg', '12.5kg'].map((item, index) => (
              <div
                key={index}
                className="border px-4 py-1 rounded-xl
                  border-(--primary) text-(--primary) bg-[rgba(21,172,251,0.05)]
                  "
              >
                {item}
              </div>
            ))
          }
        </div>
      </div>
      <div>
        <span className="text-[#999999] text-sm">套餐类型</span>
        <div className="flex gap-4 p-2">
          {
            ['瓶装', '小样'].map((item, index) => (
              <div
                key={index}
                className="border px-4 py-1 rounded-xl
                  border-(--primary) text-(--primary) bg-[rgba(21,172,251,0.05)]
                  "
              >
                {item}
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#999999] text-sm">购买数量</span>
        <div className="flex items-center">
            <span className="w-6 h-6 flex items-center
            justify-center border border-gray-400 rounded-tl-lg rounded-bl-lg
            ">
              -
            </span>
          <span className="w-8 h-6 text-center border-y border-y-gray-400">
              1
            </span>
          <span className="w-6 h-6 border
              border-gray-400 flex items-center justify-center rounded-tr-lg rounded-br-lg
            ">
              +
            </span>
        </div>
      </div>
      <div className="flex">
        <div className="bg-[#53EFB6] text-white flex-1
            p-2 px-4 rounded-tl-full rounded-bl-full
            flex items-center justify-center
          ">
          加入购物车
        </div>
        <div className="bg-[#15ACFB] text-white flex-1
            p-2 px-4 rounded-tr-full rounded-br-full
            flex items-center justify-center
          ">
          立即购买
        </div>
      </div>
    </div>
  </>
}