import React, { useEffect, useRef, useState } from 'react';
import styles from "./addProduct.module.css";
import uniqId from "uniqid";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { Toast } from 'primereact/toast';
import { createProduct } from '../../Features/Products/productSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  SKU: ""
}

const initialStateColor1 = {
  color: "",
  stock: 0,
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
}
const initialStateColor2 = {
  color: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
}
const initialStateColor3 = {
  color: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
}

const AddProduct = () => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { message } = state.products;
  const [newProduct, setNewProduct] = useState(initialState);
  const [color1, setColor1] = useState(initialStateColor1);
  const [finalColor1, setFinalColor1] = useState(null);
  const [color2, setColor2] = useState(initialStateColor2);
  const [finalColor2, setFinalColor2] = useState(null);
  const [color3, setColor3] = useState(initialStateColor3);
  const [finalColor3, setFinalColor3] = useState(null);

  const [useColor2, setUseColor2] = useState(false);
  const [useColor3, setUseColor3] = useState(false);

  const handleColor1 = (e) =>{
    setColor1({
      ...color1,
      [e.target.name]: e.target.value
    })
  };
  const handleColor2 = (e) =>{
    setColor2({
      ...color2,
      [e.target.name]: e.target.value
    })
  };
  const handleColor3 = (e) =>{
    setColor3({
      ...color3,
      [e.target.name]: e.target.value
    })
  };

  const handleUseColor2 = (e) =>{
    if(e.target.checked){
      setUseColor2(true);
      e.target.checked = true;
    }else{
      setUseColor2(false);
      e.target.checked = false;
    }
  };

  const handleUseColor3 = (e) =>{
    if(e.target.checked){
      if(!useColor2){
        e.target.checked = false;
        return refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "You can't use Color 3 without using Color 2"});
      }else{
        setUseColor3(true);
        e.target.checked = true;
      }
    }
  }

  const handleChange = (e) =>{
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    })
  };

  const handleCreate = () =>{
    if(!newProduct.name || !newProduct.brand || !newProduct.price || !newProduct.description || !newProduct.specifications || !newProduct.categories.length || !newProduct.sizes.length || !newProduct.genre){
      // Top Level information missing
      return refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    };

    if(!color1.color || !color1.image1 || !color1.image2 || !color1.image3 || !color1.stock){
      return refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Color 1 fields incomplete"});
    };

    if(useColor2){
      if(!color2.color || !color2.image1 || !color2.image2 || !color2.image3 || !color2.stock){
      return refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Color 2 fields incomplete"});
      }else{
        setFinalColor2({
          color: color2.color,
          images: [color2.image1, color2.image2, color2.image3]
        })
        
        if(color2.image4.length){
          setFinalColor2({...finalColor2, images: [...finalColor2.images, color2.image4]});
        }
        if(color2.image5.length){
          if(!color2.image4.length){
            // Alert
            refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Image 4 Field is empty at Color 2"});
          }else{
            setFinalColor2({...finalColor2, images: [...finalColor2.images, color2.image5]});
          }
        };
      }
    };

    if(useColor3){
      if(!color3.color || !color3.image1 || !color3.image2 || !color3.image3 || !color3.stock){
      return refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Color 3 fields incomplete"});
      }else{
        setFinalColor3({
          color: color3.color,
          images: [color3.image1, color3.image2, color3.image3]
        })
        
        if(color3.image4.length){
          setFinalColor3({...finalColor3, images: [...finalColor3.images, color3.image4]});
        }
        if(color3.image5.length){
          if(!color3.image4.length){
            // Alert
            refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Image 4 Field is empty at Color 2"});
          }else{
            setFinalColor3({...finalColor3, images: [...finalColor3.images, color3.image5]});
          }
        };
      }
    };


    let colors = [];
    if(color1.color){
      colors.push(color1.color);
    }else if(color2.color){
      colors.push(color2.color);
    }else if(color3.color){
      colors.push(color3.color);
    };    

    // COLOR 1 VALIDATION
    setFinalColor1({
      color: color1.color,
      images: [color1.image1, color2.image2, color3.image3]
    })
    
    if(color1.image4.length){
      setFinalColor1({...finalColor1, images: [...finalColor1.images, color1.image4]});
    }
    if(color1.image5.length){
      if(!color1.image4.length){
        // Alert
        refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Image 4 Field is empty"});
      }else{
        setFinalColor1({...finalColor1, images: [...finalColor1.images, color1.image5]});
      }
    };

    const finalNewProduct = {
      name: newProduct.name,
      brand: newProduct.brand,
      price: newProduct.price,
      description: newProduct.description,
      specifications: newProduct.specifications,
      categories: [newProduct.category, newProduct.genre],
      sizes: newProduct.sizes,
      SKU: newProduct.SKU
    }
    
    dispatch(createProduct({
      ...finalNewProduct,
      colors: colors,
      stock: [
        {
          color: color1.color,
          stock: color1.stock,
          sold: 0
        },
        useColor2 && {
          color: color2.color,
          stock: color2.stock,
          sold: 0
        },
        useColor3 && {
          color: color3.color,
          stock: color3.stock,
          sold: 0
        }
      ],
      images: [
        finalColor1,
        useColor2 && finalColor2,
        useColor3 && finalColor3
      ]
    }))
  };

  useEffect(() => {
    setNewProduct({
      ...newProduct,
      SKU: uniqId()
    })
  }, []);

  return ( 
    <div className={styles.wrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      <h3>Add Product</h3>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div className='form-floating mb-1 w-100 p-1'>
            <input type="text" id='name' name='name' onChange={handleChange} className='form-control' value={newProduct.name} />
            <label htmlFor="name">Name <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input type="text" id='brand' name="brand" onChange={handleChange} className='form-control' value={newProduct.brand} />
            <label htmlFor="brand">Brand <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input type="text" id='price' name='price' onChange={handleChange} className='form-control' value={newProduct.price} />
            <label htmlFor="price">Price <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <textarea rows="6" cols="80" name='description' onChange={handleChange} type="text" id='description' className={styles.textarea} value={newProduct.description}></textarea>
            <label htmlFor="description" className={styles.label}>Description <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <input type="text" id='specifications' name='specifications' onChange={handleChange} className='form-control' value={newProduct.specifications} />
            <label htmlFor="specifications">Specifications <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input type="text" id='specifications' name='category' onChange={handleChange} className='form-control' value={newProduct.categories} />
            <label htmlFor="specifications">Category <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input type="text" id='specifications' name='sizes' onChange={handleChange} className='form-control' value={newProduct.sizes} />
            <label htmlFor="specifications">Sizes <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='w-100'></div>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input type="text" id='specifications' name='genre' onChange={handleChange} className='form-control' value={newProduct.genre} />
            <label htmlFor="specifications">Genre <span className={styles.optional}>(Required)</span></label>
          </div>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input readOnly type="text" id='specifications' name='SKU' className='form-control' value={newProduct.sku} />
            <label htmlFor="specifications">Sku</label>
          </div>

          {/* Color 1 */}
          <details className='w-100 mt-5'>
            <summary>Color 1</summary>
            <div className={styles.color}>
              <span className={styles.optional} style={{color: "#777777"}}>*Required</span>
              <div className='form-floating mb-1 w-100 p-1 mt-2'>
                <input type="text" id='specifications' className='form-control' name='color' onChange={handleColor1} value={color1.color} />
                <label htmlFor="specifications">Color A</label>
              </div>
              <div className='form-floating mb-1 w-100 p-1 mt-2'>
                <input type="text" id='specifications' className='form-control' name='stock' onChange={handleColor1} value={color1.stock} />
                <label htmlFor="specifications">Stock</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image1' onChange={handleColor1} value={color1.image1}/>
                <label htmlFor="specifications">Image 1</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image2' onChange={handleColor1} value={color1.image2}/>
                <label htmlFor="specifications">Image 2</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image3' onChange={handleColor1} value={color1.image3}/>
                <label htmlFor="specifications">Image 3</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image4' onChange={handleColor1} value={color1.image4}/>
                <label htmlFor="specifications">Image 4 <span className={styles.optional}>(Optional)</span></label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image5' onChange={handleColor1} value={color1.image5}/>
                <label htmlFor="specifications">Image 5 <span className={styles.optional}>(Optional)</span></label>
              </div>
              
            </div>
          </details>

          {/* Color 2 */}
          <details className='w-100 mt-3'>
            <summary>Color 2 <span className={styles.optional}>(Optional)</span></summary>
            <div className={styles.color}>
              <div className={styles.formRequired}>
                <span className={styles.optional} style={{color: "#777777"}}>*Required</span>
                <div className={styles.formCheckbox}>
                  <input type="checkbox" id='checkbox' onChange={handleUseColor2}/>
                  <label htmlFor="checkbox">I'm using this color</label>
                </div>
              </div>
              <div className='form-floating mb-1 w-100 p-1 mt-2'>
                <input type="text" id='specifications' className='form-control' name='color' onChange={handleColor2} value={color2.color} />
                <label htmlFor="specifications">Color B</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image1' onChange={handleColor2} value={color2.image1}/>
                <label htmlFor="specifications">Image 1</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image2' onChange={handleColor2} value={color2.image2}/>
                <label htmlFor="specifications">Image 2</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image3' onChange={handleColor2} value={color2.image3}/>
                <label htmlFor="specifications">Image 3</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image4' onChange={handleColor2} value={color2.image4}/>
                <label htmlFor="specifications">Image 4 <span className={styles.optional}>(Optional)</span></label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image5' onChange={handleColor2} value={color2.image5}/>
                <label htmlFor="specifications">Image 5 <span className={styles.optional}>(Optional)</span></label>
              </div>
              
            </div>
          </details>

          {/* Color 3 */}
          <details className='w-100 mt-3'>
            <summary>Color 3 <span className={styles.optional}>(Optional)</span></summary>
            <div className={styles.color}>
              <div className={styles.formRequired}>
                <span className={styles.optional} style={{color: "#777777"}}>*Required</span>
                <div className={styles.formCheckbox}>
                  <input type="checkbox" id='checkbox' onChange={handleUseColor3}/>
                  <label htmlFor="checkbox">I'm using this color</label>
                </div>
              </div>
              <div className='form-floating mb-1 w-100 p-1 mt-2'>
                <input type="text" id='specifications' className='form-control' name='color' onChange={handleColor3} value={color3.color} />
                <label htmlFor="specifications">Color C</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image1' onChange={handleColor3} value={color3.image1}/>
                <label htmlFor="specifications">Image 1</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image2' onChange={handleColor3} value={color3.image2}/>
                <label htmlFor="specifications">Image 2</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image3' onChange={handleColor3} value={color3.image3}/>
                <label htmlFor="specifications">Image 3</label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image4' onChange={handleColor3} value={color3.image4}/>
                <label htmlFor="specifications">Image 4 <span className={styles.optional}>(Optional)</span></label>
              </div>
              <div className='form-floating mb-1 flex-grow-1 p-1'>
                <input type="text" id='specifications' className='form-control' name='image5' onChange={handleColor3} value={color3.image5}/>
                <label htmlFor="specifications">Image 5 <span className={styles.optional}>(Optional)</span></label>
              </div>
              
            </div>
          </details>

          <div className={styles.createBtn} onClick={handleCreate}>
            <button>Create</button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default AddProduct;