import React, { useEffect, useRef, useState } from "react";
import styles from "./addProduct.module.css";
import uniqId from "uniqid";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { createProduct } from "../../Features/Products/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { TailSpin } from "react-loader-spinner";

const initialState = {
  name: "",
  brand: "",
  colors: [],
  description: "",
  category: "",
  sizes: [],
  specifications: "",
  genre: "",
  price: null,
  SKU: "",
  images: [],
  stock: [],
};

const initialStateColor1 = {
  color: "",
  stock: 0,
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
};
const initialStateColor2 = {
  color: "",
  stock: 0,
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
};
const initialStateColor3 = {
  color: "",
  stock: 0,
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
};

const AddProduct = () => {
  const refToast = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { message, isLoading } = state.products;
  const [newProduct, setNewProduct] = useState(initialState);
  const [color1, setColor1] = useState(initialStateColor1);

  const [color2, setColor2] = useState(initialStateColor2);

  const [color3, setColor3] = useState(initialStateColor3);

  const [useColor2, setUseColor2] = useState(false);
  const [useColor3, setUseColor3] = useState(false);

  const handleColor1 = (e) => {
    setColor1({
      ...color1,
      [e.target.name]: e.target.value,
    });
  };
  const handleColor2 = (e) => {
    setColor2({
      ...color2,
      [e.target.name]: e.target.value,
    });
  };
  const handleColor3 = (e) => {
    setColor3({
      ...color3,
      [e.target.name]: e.target.value,
    });
  };

  const handleUseColor2 = (e) => {
    if (e.target.checked) {
      setUseColor2(true);
      e.target.checked = true;
    } else {
      setUseColor2(false);
      e.target.checked = false;
    }
  };

  const handleUseColor3 = (e) => {
    if (e.target.checked) {
      if (!useColor2) {
        e.target.checked = false;
        return refToast.current.show({
          life: 3000,
          severity: "warn",
          summary: "Wait!",
          detail: "You can't use Color 3 without using Color 2",
        });
      } else {
        setUseColor3(true);
        e.target.checked = true;
      }
    }
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    if (
      !newProduct.name ||
      !newProduct.brand ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.specifications ||
      !newProduct.category.length ||
      !newProduct.sizes.length ||
      !newProduct.genre
    ) {
      // Top Level information missing
      return refToast.current.show({
        life: 3000,
        severity: "warn",
        summary: "Wait!",
        detail: "Please complete all fields",
      });
    }

    if (
      !color1.color ||
      !color1.image1 ||
      !color1.image2 ||
      !color1.image3 ||
      !color1.stock
    ) {
      return refToast.current.show({
        life: 3000,
        severity: "warn",
        summary: "Wait!",
        detail: "Color 1 fields incomplete",
      });
    }

    let colors = [];
    if (color1.color) {
      colors.push(color1.color);
    }
    if (useColor2) {
      colors.push(color2.color);
    }
    if (useColor3) {
      colors.push(color3.color);
    }
    console.log(colors);

    // COLOR 1 VALIDATION

    const images = [
      {
        color: color1.color,
        images: [color1.image1, color1.image2, color1.image3],
      },
    ];
    if (color1.image4.length) {
      images[0].images.push(color1.image4);
    }
    if (color1.image5.length && color1.image4.length) {
      images[0].images.push(color1.image5);
    } else if (color1.image5.length) {
      return refToast.current.show({
        life: 3000,
        severity: "warn",
        summary: "Wait!",
        detail: "Color 4 field incomplete",
      });
    }
    if (useColor2) {
      if (!color2.color || !color2.image1 || !color2.image2 || !color2.image3) {
        return refToast.current.show({
          life: 3000,
          severity: "warn",
          summary: "Wait!",
          detail: "Color 2 fields incomplete",
        });
      } else {
        images.push({
          color: color2.color,
          images: [color2.image1, color2.image2, color2.image3],
        });
      }
      if (color2.image4.length) {
        images[1].images.push(color2.image4);
      }
      if (color2.image5.length && color2.image4.length) {
        images[1].images.push(color2.image5);
      } else if (color1.image5.length) {
        return refToast.current.show({
          life: 3000,
          severity: "warn",
          summary: "Wait!",
          detail: "Color 4 field incomplete",
        });
      }
    }
    if (useColor3) {
      if (!color3.color || !color3.image1 || !color3.image2 || !color3.image3) {
        return refToast.current.show({
          life: 3000,
          severity: "warn",
          summary: "Wait!",
          detail: "Color 3 fields incomplete",
        });
      } else {
        images.push({
          color: color3.color,
          images: [color3.image1, color3.image2, color3.image3],
        });
      }
      if (color3.image4.length) {
        images[2].images.push(color3.image4);
      }
      if (color3.image5.length && color3.image4.length) {
        images[2].images.push(color3.image5);
      } else if (color1.image5.length) {
        return refToast.current.show({
          life: 3000,
          severity: "warn",
          summary: "Wait!",
          detail: "Color 4 field incomplete",
        });
      }
    }

    const stock = [
      {
        color: color1.color,
        stock: color1.stock,
        sold: 0,
      },
    ];

    if (useColor2 && color2.color) {
      stock.push({
        color: color2.color,
        stock: color2.stock,
        sold: 0,
      });
    }

    if (useColor3 && color3.color) {
      stock.push({
        color: color3.color,
        stock: color3.stock,
        sold: 0,
      });
    }

    // Filtrar objetos nulos o falsos en stock
    const filteredStock = stock.filter(
      (item) => item !== null && item !== false
    );

    const filteredImages = images.filter(
      (item) => item !== null && item !== false
    );
    const finalNewProduct = {
      name: newProduct.name,
      brand: newProduct.brand,
      price: newProduct.price,
      description: newProduct.description,
      specifications: newProduct.specifications,
      categories: [newProduct.category, newProduct.genre],
      sizes: [newProduct.sizes],
      SKU: newProduct.SKU,
    };

    // Filtrar imágenes nulas o falsas
    const filteredColors = colors.filter(
      (item) => item !== null && item !== false
    );

    dispatch(
      createProduct({
        ...finalNewProduct,
        colors: filteredColors,
        stock: filteredStock,
        images: filteredImages,
      })
    );
  };

  useEffect(() => {
    if (message === "Creating Product Success") {
      refToast.current.show({
        life: 3000,
        severity: "success",
        summary: "Success",
        detail: message,
      });
    } else if (message === "Creating Product Error") {
      refToast.current.show({
        life: 3000,
        severity: "error",
        summary: "Error",
        detail: "Product name already exist",
      });
    }
    setNewProduct({
      ...newProduct,
      SKU: uniqId(),
    });
  }, [isLoading, message]);

  return (
    <div className={styles.wrapper}>
      <Toast ref={refToast} position="top-left"></Toast>
      <h3>Add Product</h3>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div className="form-floating mb-1 w-100 p-1">
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="form-control"
              value={newProduct.name}
            />
            <label htmlFor="name">
              Name <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="form-floating mb-1 flex-grow-1 p-1">
            <input
              type="text"
              id="brand"
              name="brand"
              onChange={handleChange}
              className="form-control"
              value={newProduct.brand}
            />
            <label htmlFor="brand">
              Brand <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="form-floating mb-1 flex-grow-1 p-1">
            <input
              type="text"
              id="price"
              name="price"
              onChange={handleChange}
              className="form-control"
              value={newProduct.price}
            />
            <label htmlFor="price">
              Price <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="form-floating mb-1 w-100 p-1">
            <textarea
              rows="6"
              cols="80"
              name="description"
              onChange={handleChange}
              type="text"
              id="description"
              className={styles.textarea}
              value={newProduct.description}
            ></textarea>
            <label htmlFor="description" className={styles.label}>
              Description <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="form-floating mb-1 w-100 p-1">
            <input
              type="text"
              id="specifications"
              name="specifications"
              onChange={handleChange}
              className="form-control"
              value={newProduct.specifications}
            />
            <label htmlFor="specifications">
              Specifications <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="form-floating mb-1 flex-grow-1 p-1">
            <input
              type="text"
              id="specifications"
              name="category"
              onChange={handleChange}
              className="form-control"
              value={newProduct.categories}
            />
            <label htmlFor="specifications">
              Category <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="form-floating mb-1 flex-grow-1 p-1">
            <input
              type="text"
              id="specifications"
              name="sizes"
              onChange={handleChange}
              className="form-control"
              value={newProduct.sizes}
            />
            <label htmlFor="specifications">
              Sizes <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="w-100"></div>
          <div className="form-floating mb-1 flex-grow-1 p-1">
            <input
              type="text"
              id="specifications"
              name="genre"
              onChange={handleChange}
              className="form-control"
              value={newProduct.genre}
            />
            <label htmlFor="specifications">
              Genre <span className={styles.optional}>(Required)</span>
            </label>
          </div>
          <div className="form-floating mb-1 flex-grow-1 p-1">
            <input
              readOnly
              type="text"
              id="specifications"
              name="SKU"
              className="form-control"
              value={newProduct.sku}
            />
            <label htmlFor="specifications">Sku</label>
          </div>
          {/* Color 1 */}
          <details className="w-100 mt-5">
            <summary>Color 1</summary>
            <div className={styles.color}>
              <span className={styles.optional} style={{ color: "#777777" }}>
                *Required
              </span>
              <div className="form-floating mb-1 w-100 p-1 mt-2">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="color"
                  onChange={handleColor1}
                  value={color1.color}
                />
                <label htmlFor="specifications">Color A</label>
              </div>
              <div className="form-floating mb-1 w-100 p-1 mt-2">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="stock"
                  onChange={handleColor1}
                  value={color1.stock}
                />
                <label htmlFor="specifications">Stock</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image1"
                  onChange={handleColor1}
                  value={color1.image1}
                />
                <label htmlFor="specifications">Image 1</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image2"
                  onChange={handleColor1}
                  value={color1.image2}
                />
                <label htmlFor="specifications">Image 2</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image3"
                  onChange={handleColor1}
                  value={color1.image3}
                />
                <label htmlFor="specifications">Image 3</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image4"
                  onChange={handleColor1}
                  value={color1.image4}
                />
                <label htmlFor="specifications">
                  Image 4 <span className={styles.optional}>(Optional)</span>
                </label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image5"
                  onChange={handleColor1}
                  value={color1.image5}
                />
                <label htmlFor="specifications">
                  Image 5 <span className={styles.optional}>(Optional)</span>
                </label>
              </div>
            </div>
          </details>
          {/* Color 2 */}
          <details className="w-100 mt-3">
            <summary>
              Color 2 <span className={styles.optional}>(Optional)</span>
            </summary>
            <div className={styles.color}>
              <div className={styles.formRequired}>
                <span className={styles.optional} style={{ color: "#777777" }}>
                  *Required
                </span>
                <div className={styles.formCheckbox}>
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={handleUseColor2}
                  />
                  <label htmlFor="checkbox">I'm using this color</label>
                </div>
              </div>
              <div className="form-floating mb-1 w-100 p-1 mt-2">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="color"
                  onChange={handleColor2}
                  value={color2.color}
                />
                <label htmlFor="specifications">Color B</label>
              </div>
              <div className="form-floating mb-1 w-100 p-1 mt-2">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="stock"
                  onChange={handleColor2}
                  value={color2.stock}
                />
                <label htmlFor="specifications">Stock</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image1"
                  onChange={handleColor2}
                  value={color2.image1}
                />
                <label htmlFor="specifications">Image 1</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image2"
                  onChange={handleColor2}
                  value={color2.image2}
                />
                <label htmlFor="specifications">Image 2</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image3"
                  onChange={handleColor2}
                  value={color2.image3}
                />
                <label htmlFor="specifications">Image 3</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image4"
                  onChange={handleColor2}
                  value={color2.image4}
                />
                <label htmlFor="specifications">
                  Image 4 <span className={styles.optional}>(Optional)</span>
                </label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image5"
                  onChange={handleColor2}
                  value={color2.image5}
                />
                <label htmlFor="specifications">
                  Image 5 <span className={styles.optional}>(Optional)</span>
                </label>
              </div>
            </div>
          </details>
          {/* Color 3 */}
          <details className="w-100 mt-3">
            <summary>
              Color 3 <span className={styles.optional}>(Optional)</span>
            </summary>
            <div className={styles.color}>
              <div className={styles.formRequired}>
                <span className={styles.optional} style={{ color: "#777777" }}>
                  *Required
                </span>
                <div className={styles.formCheckbox}>
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={handleUseColor3}
                  />
                  <label htmlFor="checkbox">I'm using this color</label>
                </div>
              </div>
              <div className="form-floating mb-1 w-100 p-1 mt-2">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="color"
                  onChange={handleColor3}
                  value={color3.color}
                />
                <label htmlFor="specifications">Color C</label>
              </div>
              <div className="form-floating mb-1 w-100 p-1 mt-2">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="stock"
                  onChange={handleColor3}
                  value={color3.stock}
                />
                <label htmlFor="specifications">Stock</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image1"
                  onChange={handleColor3}
                  value={color3.image1}
                />
                <label htmlFor="specifications">Image 1</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image2"
                  onChange={handleColor3}
                  value={color3.image2}
                />
                <label htmlFor="specifications">Image 2</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image3"
                  onChange={handleColor3}
                  value={color3.image3}
                />
                <label htmlFor="specifications">Image 3</label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image4"
                  onChange={handleColor3}
                  value={color3.image4}
                />
                <label htmlFor="specifications">
                  Image 4 <span className={styles.optional}>(Optional)</span>
                </label>
              </div>
              <div className="form-floating mb-1 flex-grow-1 p-1">
                <input
                  type="text"
                  id="specifications"
                  className="form-control"
                  name="image5"
                  onChange={handleColor3}
                  value={color3.image5}
                />
                <label htmlFor="specifications">
                  Image 5 <span className={styles.optional}>(Optional)</span>
                </label>
              </div>
            </div>
          </details>
          {isLoading ? (
            <TailSpin
              height="20"
              width="20"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              className={`mx-auto mt-4`}
              wrapperStyle={{
                margin: "auto", // Centra horizontalmente
                marginTop: "4rem",
              }}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <div className={styles.createBtn} onClick={handleCreate}>
              <button>Create</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
