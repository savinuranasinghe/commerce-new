import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

function ProductImages() {
  const { productData, setImage, image } = useContext(ProductContext);

  return (
    <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
        {productData.image.map((item, index) => {
          return (
            <img
              onClick={() => setImage(item)}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              src={item}
              key={index}
              alt=""
            />
          );
        })}
      </div>
      <div className="w-full sm:w-[80%]">
        <img className="w-full hight-auto" src={image} alt="" />
      </div>
    </div>
  );
}

export default ProductImages;
