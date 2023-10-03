import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk } from "../../slice/createProductSlice";
import { editProductThunk } from "../../slice/editProductSlice";

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().required(),
    sale: yup.number().max(100).required(),
    quanlity: yup.number().required(),
    category: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export type ProductsType = {
  name: string;
  price: number;
  sale: number;
  quanlity: number;
  category: string;
  productimg?: string;
  description: string;
  id?: number;
};

function ModalProduct({
  modalHander,
  title,
  productChoose,
}: {
  productChoose?: ProductsType;
  modalHander: () => void;
  title: string;
}) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  console.log(file);

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<ProductsType>({
    resolver: yupResolver(schema),
    defaultValues: productChoose,
  });

  function onSubmitProduct(data: ProductsType) {
    if (productChoose) {
      editProduct({
        id: data.id,
        name: data.name,
        price: data.price,
        sale: data.sale,
        quanlity: data.quanlity,
        category: data.category,
        productimg: file,
        description: data.description,
      });
    } else {
      addProduct({
        name: data.name,
        price: data.price,
        sale: data.sale,
        quanlity: data.quanlity,
        category: data.category,
        productimg: file,
        description: data.description,
      });
    }

    resetField("name");
    resetField("price");
    resetField("sale");
    resetField("quanlity");
    resetField("category");
    resetField("productimg");
    resetField("description");
  }

  async function addProduct(data: ProductsType) {
    dispatch(createProductThunk(data));
  }
  async function editProduct(data: ProductsType) {
    dispatch(editProductThunk(data));
  }

  return (
    <>
      <div className="overlay" onClick={() => modalHander()}></div>
      <div className="modal__form">
        <div className="modal__box">
          <h2>{title} products</h2>
          <form onSubmit={handleSubmit(onSubmitProduct)}>
            <div>
              <label htmlFor="">Name: </label>
              <input
                type="text"
                placeholder="Product Name"
                {...register("name")}
              />
              {errors.name && <p className="error-ip">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="">Price:</label>
              <input
                type="number"
                placeholder="Product price"
                {...register("price")}
              />
              {errors.price && (
                <p className="error-ip">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Sale(%):</label>
              <input
                type="number"
                placeholder="Product sale"
                {...register("sale")}
              />
              {errors.sale && <p className="error-ip">{errors.sale.message}</p>}
            </div>
            <div>
              <label htmlFor="">Quanlity:</label>
              <input
                type="number"
                placeholder="Product quanlity"
                {...register("quanlity")}
              />
              {errors.quanlity && (
                <p className="error-ip">{errors.quanlity.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Category:</label> <br />
              <input
                type="radio"
                id="fashion"
                name="category"
                value="Fashion"
                {...register("category")}
              />
              <label htmlFor="fashion">Fashion</label> <span>||</span>
              <input
                type="radio"
                id="shoes"
                name="category"
                value="Shoes"
                {...register("category")}
              />
              <label htmlFor="shoes">Shoes</label>
              {errors.category && (
                <p className="error-ip">{errors.category.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="image">Image: </label>
              <input
                type="file"
                id="image"
                onChange={(e) =>
                  setFile(URL.createObjectURL(e.target.files[0]))
                }
              />
            </div>
            <div>
              <label htmlFor="">Description:</label>
              <textarea
                rows={1}
                placeholder="Product description"
                {...register("description")}
              />
              {errors.description && (
                <p className="error-ip">{errors.description.message}</p>
              )}
            </div>
            <div className="modal__product-btn">
              <button onClick={() => modalHander()}>Close</button>
              <button type="submit">{title}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ModalProduct;
