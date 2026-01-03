import {useState} from "react";
import {menu1, menu2, menu3, menu4, menu5} from "../import.ts";

export default function Menus({active} : {active:boolean}){
  const [menus] = useState([
    {title: '水果蔬菜', icon: menu1},
    {title: '服饰箱包', icon: menu2},
    {title: '海鲜水产', icon: menu3},
    {title: '休闲零食', icon: menu4},
    {title: '母婴用品', icon: menu5},
  ])
  function getClass(){
    return active
      ? "bg-white flex flex-col items-center justify-center p-2 rounded-lg"
      : 'flex flex-col items-center justify-center'
  }
  return (
    <>
      <div className="flex justify-between mt-4 px-1 ">
        {
          menus.map((item, i) => (
            <div key={i} className={getClass()}>
              <img src={item.icon} alt=''/>
              <span className="text-xs mt-1">{item.title}</span>
            </div>
          ))
        }
      </div>
    </>
  )
}