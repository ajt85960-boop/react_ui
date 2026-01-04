import Menus from "../components/items.tsx";
import ProductList from "../components/productList.tsx";
import {useCallback, useEffect, useState} from "react";
import type {NewArrival} from "./index.tsx";
import {getList} from "../api/http.ts";

export default function Classify() {

  const [loading, setLoading] = useState(true);

  const [classify, setClassify] = useState<NewArrival[]>([]);

  const getClassify = useCallback(async () => {
    try{
      setLoading(true);
      const classifyList = await getList();
      setClassify(classifyList.data as NewArrival[])
    } finally {
      setLoading(false);
    }
  },[])

  useEffect(() => {
    void getClassify();
  },[getClassify])

  return (
    <>
      <div className='h-screen overflow-y-scroll pb-20.75'>
        <header className="sticky top-0 h-15 bg-white
                                    flex items-center justify-center z-50">
          <div className="font-bold text-gray-800">
            分类
          </div>
        </header>
        <main className="px-2 mt-1">
          <Menus active={true}></Menus>
          {loading ? <div>加载中...</div> : <ProductList totalList={classify}/>}
        </main>
      </div>
    </>
  )
}