import Menus from "../components/items.tsx";
import ProductList from "../components/productList.tsx";

export default function Classify() {
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
          <ProductList/>
        </main>
      </div>
    </>
  )
}