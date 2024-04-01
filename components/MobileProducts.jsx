import React from "react";
import Product from "./Product";
import EmptyProduct from "./empty/EmptyProduct";

export default function MobileProducts({ products }) {

  return (
    <div className=" px-8 xl:w-2/3 w-full mx-auto overflow-hidden">
      <div className="flex justify-between items-center">
        <h2 className="xl:text-3xl text-xl text-center font-bold">Mobile</h2>
        <p className="text-lg  text-center font-bold">Go to shop</p>
      </div>
      <div className="my-[40px]">
        {products?.length === 0 ? (
          <>
            <EmptyProduct message={"Products not found"} />
          </>
        ) : (
          <>
            {products?.map((product, idx) => (
              <div key={idx} className="flex">
                <Product product={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
