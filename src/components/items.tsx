// // import {useState} from "react";
// // import {menu1, menu2, menu3, menu4, menu5} from "../import.ts";
//
//
// import {useState} from "react";
//
// type MenusType = {
//   title: string,
//   icon: string
// }
// export default function Menus({active} : {active:boolean}){
//   // const [menus] = useState([
//   //   {title: '水果蔬菜', icon: menu1},
//   //   {title: '服饰箱包', icon: menu2},
//   //   {title: '海鲜水产', icon: menu3},
//   //   {title: '休闲零食', icon: menu4},
//   //   {title: '母婴用品', icon: menu5},
//   // ])
//
//   const [menus, setMenus] = useState()
//   function getClass(){
//     return active
//       ? "bg-white flex flex-col items-center justify-center p-2 rounded-lg"
//       : 'flex flex-col items-center justify-center'
//   }
//   return (
//     <>
//       <div className="flex justify-between mt-4 px-1 ">
//         {
//           menus.map((item, i) => (
//             <div key={i} className={getClass()}>
//               <img src={item.icon} alt=''/>
//               <span className="text-xs mt-1">{item.title}</span>
//             </div>
//           ))
//         }
//       </div>
//     </>
//   )
// }

import { useCallback, useEffect, useState } from "react";
import {getMuneList} from "../api/http";
import {BASEURL} from "../utils/request.ts";

// 如果前端需要的字段名和后端不一致，建议在这里定义前端的 Type
type MenusType = {
  title: string;
  icon: string;
}

interface CategoryItem {
  id: number;
  name: string;      // 对应你数据库里的 name
  icon: string;      // 对应图标
  parent_id: number;
}

export default function Menus({ active }: { active: boolean }) {
  // 1. 初始化时给一个空数组，防止 map 报错
  const [menus, setMenus] = useState<MenusType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMuneList();

      // 2. 数据转换：将后端的 name 映射为前端需要的 title
      // 如果后端直接返回 title，则直接 setMenus(res.data)
      const formattedData = res.data.map((item: CategoryItem) => ({
        title: item.name,
        icon: BASEURL + item.icon
      }));

      setMenus(formattedData);
    } catch (error) {
      console.error("加载菜单失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getList();
  }, [getList]);

  // 3. 将样式逻辑抽离，保持 JSX 整洁
  const itemClass = active
    ? "bg-white flex flex-col items-center justify-center p-2 rounded-lg"
    : "flex flex-col items-center justify-center";

  // 4. 加载中状态
  if (loading && menus.length === 0) {
    return <div className="text-center mt-4">加载中...</div>;
  }

  return (
    <div className="flex justify-between mt-4 px-1">
      {menus.map((item, i) => (
        <div key={i} className={itemClass}>
          <img src={item.icon} alt={item.title} className="w-8 h-8" />
          <span className="text-xs mt-1">{item.title}</span>
        </div>
      ))}
    </div>
  );
}