import React from "react";
import Product from "./Product";
import EmptyProduct from "./empty/EmptyProduct";
import Link from "next/link";

export default function MobileProducts({ products }) {

  return (
    <div className=" px-8 xl:w-2/3 w-full mx-auto overflow-hidden">
      <div className="flex  border-b border-0 py-2 border-b-[#ECF1F2] border-6">
        <h2 className="xl:text-3xl text-xl text-center font-bold">Mobile</h2>
      </div>
      <div className="my-[40px]">
        {products?.length === 0 ? (
          <>
            <EmptyProduct message={"Products not found"} />
          </>
        ) : (
          <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 ">
            {products?.slice(0,8).map((product, idx) => (
                <Product key={idx} product={product} />
            ))}
          </div>
        )}
        <Link href={"/products"} className="text-lg flex justify-end underline text-[#F02D34]  text-center font-bold">Go to shop</Link>

      </div>
    </div>
  );
}
