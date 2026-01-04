import details from '../assets/product/details.png'
import right from '../assets/icons/right.png'
import {useParams} from "react-router-dom";
import share from '../assets/icons/share.svg'
import car from '../assets/icons/car.svg'
import close from '../assets/icons/close.svg'
import {useCallback, useEffect, useState} from "react";
import left from '../assets/icons/left.svg'
import {getDetail} from "../api/http.ts";
import {BASEURL} from "../utils/request.ts";

interface ProductImage {
  id: number,
  product_id: string,
  image_url: string,
  is_cover: number,
  sort_order: number
}

interface ProductDetail{
  "id": number,
  "product_id": number,
  "spec_name": string,
  "price": number,
  "stock": number,
  "sku_code": string,
  "images": ProductImage[]
}

export default function Details() {
  // useParams 是 React Router 提供的一个 hook，用于获取 URL 中的动态参数
  // 从url获取商品id
  const {id} = useParams<{ id: string }>();

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  // 初始值是null，会报错
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)

  console.log(id)

  function back(){
    window.history.back()
  }

  // 根据id获取商品详情
  const getProductDetail = useCallback(async (id:string) => {
    try{
      setLoading(true);
      const detail = await getDetail(Number(id));
      setProductDetail(detail.data)
    }finally {
      setLoading(false);
    }
  },[])

  //不监听id，会导致点击其他商品，url的id还是上一个商品
  // useEffect(() => {
  //   void getProductDetail(id)
  // },[getProductDetail])  

  //自动调用，页面加载时自动执行
//   执行流程 ：
// 1. 用户点击商品 → URL 变成 /details/123
// 2. useParams 获取 id = "123"
// 3. useEffect 检测到 id 变化
// 4. 自动调用 getProductDetail("123")
// 5. 获取数据 → 更新 state → 渲染页面
  useEffect(() => {
    if(id){
      void getProductDetail(id)
    }
  },[id,getProductDetail])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!productDetail) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>商品不存在</div>
      </div>
    )
  }

  const coverImage = productDetail.images.find(img => img.is_cover === 1) || productDetail.images[0]

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
          <img
            src={coverImage ? BASEURL + coverImage.image_url : details}
            className="w-full h-full"
            alt=""
          />
          <div className="absolute bottom-6 right-3 px-3 py-1 rounded-full
                bg-white/50 backdrop-blur-lg
                border border-white/80 shadow-sm
                text-xs text-black font-medium">
            1 / {productDetail.images.length}
          </div>
        </div>
        <div className="px-4 w-full -mt-5 absolute ">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm flex justify-between">
              <span className="text-[#E63232] font-bold">￥{productDetail.price}</span>
              <span>库存{productDetail.stock}</span>
            </div>
            <p className="font-bold text-[17px]">
              {productDetail.spec_name}
            </p>
            <span className="text-gray-500 text-xs">
              {productDetail.sku_code}
            </span>
          </div>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3 mt-2">
            <div className="flex" onClick={() => setShowPopup(true)}>
              <div className="text-gray-500 text-sm w-[12%]">规格</div>
              <div className="text-sm text-[#383838] flex items-center justify-between flex-1">
                <span>{productDetail.spec_name}</span>
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

      {showPopup && <Popup productDetail={productDetail} onClose={() => setShowPopup(false)}/>}
    </div>
  </>
}

function Popup({productDetail, onClose}: { productDetail: ProductDetail, onClose: () => void }) {
  const [active, setActive] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const coverImage = productDetail.images.find(img => img.is_cover === 1) || productDetail.images[0]

  return <>
    <div className="bg-black/40 fixed top-0 bottom-0 w-full z-50" onClick={handleClose}></div>
    <div className={`w-full bg-white fixed bottom-0 z-50
          rounded-tl-3xl rounded-tr-3xl p-4 flex flex-col gap-4
          popup-container ${active ? 'popup-show' : ''}
        `}>
      <div className="flex items-start justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={coverImage ? BASEURL + coverImage.image_url : details}
            className="w-21 h-21 rounded-lg"
            alt=""
          />
          <div className="flex flex-col gap-1">
            <span className="text-[#E63232] font-bold">￥{productDetail.price}</span>
            <span className="text-[#999999] text-xs">库存{productDetail.stock}</span>
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
            cursor-pointer"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </span>
          <span className="w-8 h-6 text-center border-y border-y-gray-400">
              {quantity}
            </span>
          <span
            className="w-6 h-6 border
              border-gray-400 flex items-center justify-center rounded-tr-lg rounded-br-lg
              cursor-pointer"
              onClick={() => setQuantity(Math.min(productDetail.stock, quantity + 1))}
            >
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