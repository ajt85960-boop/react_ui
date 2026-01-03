import {useLocation, useNavigate} from "react-router-dom";
import {tab1, tab1Active, tab2, tab2Active, tab3, tab3Active} from "../import.ts";

interface TabType {
  icon: string,
  activeIcon: string,
  text: string,
  path: string
}

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const footerList: TabType[] = [
    {
      icon: tab1,
      activeIcon: tab1Active,
      text: '首页',
      path: '/'
    },
    {icon: tab2, activeIcon: tab2Active, text: '分类', path: '/classify'},
    {icon: tab3, activeIcon: tab3Active, text: '我的', path: '/profile'},
  ]

  function handleClick(path: string) {
    navigate(path);
  }

  return (
    <>
      <div className="w-full h-20.75 fixed bottom-0 flex justify-around items-center bg-white">
        {
          footerList.map((item, i) => (
            <div className="flex justify-center items-center flex-col gap-1" key={i} onClick={() => handleClick(item.path)}>
              <img className="w-5.5 h-5.5" src={item.path === pathname ? item.activeIcon : item.icon} alt=''/>
              <span className={item.path === pathname ? "text-[10px] text-[#12A8FF]" : "text-[10px] text-[rgba(102,102,102,1)]"}>
                {item.text}
              </span>
            </div>
          ))
        }
      </div>
    </>
  )
}
