import { useCallback, useEffect, useState } from "react";
import { getList } from "../api/http";
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

  const getMenus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getList();

      // 2. 数据转换：将后端的 name 映射为前端需要的 title
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
    void getMenus();
  }, [getMenus]);

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