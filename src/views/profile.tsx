import avatar from '../assets/images/avatar.png'
import right from '../assets/icons/right.png'
import menu1 from '../assets/profile/menu1.png'
import menu2 from '../assets/profile/menu2.png'
import menu3 from '../assets/profile/menu3.png'
import menu4 from '../assets/profile/menu4.png'
import s1 from '../assets/profile/s1.png'
import s2 from '../assets/profile/s2.png'
import s3 from '../assets/profile/s3.png'
import s4 from '../assets/profile/s4.png'

export default function Profile() {
  return <>
    <div className='h-screen overflow-y-scroll pb-20.75'>
      <div className="profile-bg"></div>
      <header className="sticky top-0 h-15 flex items-center z-50 px-4">
        <div className="flex-1">
        </div>
        <div className="flex-1 text-center font-bold text-gray-800">
          个人中心
        </div>
        <div className="flex-1">

        </div>
      </header>
      <main className="mt-1 relative px-4">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="" className="w-15 h-15"/>
          <span className="font-bold">七骑士十九</span>
        </div>
        <div className="mt-4">
          <div className="mx-2 bg-linear-to-r
          from-[rgba(41,41,41,1)] to-[rgba(82,82,82,1)]
            text-white flex justify-between items-center p-2
            rounded-tl-lg rounded-tr-lg
          ">
            <div>通用会员卡</div>
            <img src={right} alt=""/>
          </div>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold">我的订单</span>
            <div className="flex gap-2 items-center">
              <span className="text-xs opacity-50">全部</span>
              <img src={right} alt="" className="w-1 h-2"/>
            </div>
          </div>
          <div className="flex justify-between px-4 mt-2 p-2">
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={menu1} alt=""/>
              <span className="text-xs">待支付</span>
            </div>
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={menu2} alt=""/>
              <span className="text-xs">待收货</span>
            </div>
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={menu3} alt=""/>
              <span className="text-xs">已完成</span>
            </div>
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={menu4} alt=""/>
              <span className="text-xs">售后</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 mt-4 rounded-lg">
          <div className="flex items-center">
            <span className="font-bold">常用设置</span>
          </div>
          <div className="flex justify-between px-4 mt-2 p-2">
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={s1} alt=""/>
              <span className="text-xs">领券中心</span>
            </div>
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={s2} alt=""/>
              <span className="text-xs">我的卡券</span>
            </div>
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={s3} alt=""/>
              <span className="text-xs">收货地址</span>
            </div>
            <div className="flex flex-col gap-1 items-center-safe justify-center">
              <img className="w-8.5 h-8.5" src={s4} alt=""/>
              <span className="text-xs">联系客服</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </>
}