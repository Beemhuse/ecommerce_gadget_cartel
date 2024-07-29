import React, { useEffect, useState } from 'react';

const CategoryList = ({ categories, handleCategoryClick, activeCategory }) => {


    const handleClick = (category) => {
      handleCategoryClick(category);
    };
  return (
    <div className='flex gap-5 justify-center '>
    {categories?.map((category) => (
      <div key={category?._id}>
        <h2
          onClick={() => handleClick(category)}
          className={`cursor-pointer p-3 rounded-lg w-[140px] text-center ${activeCategory === category?._id ? 'bg-black text-white ' : 'border border-black-400 '}`}
        >
          {category?.name}
        </h2>
      </div>
    ))}
  </div>
  );
};

export default CategoryList;
