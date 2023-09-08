import React, { useContext, useEffect, useState } from 'react';
import styles from "./prodColorImg.module.css";
import { GlobalContext } from '../../Context/globalContext';


const ProdColorImg = () => {

  const globalContext = useContext(GlobalContext);
  const { showColorModal, setShowColorModal } = globalContext;
  const [images, setImages] = useState([]);
  const [color, setColor] = useState("");
  const [stock, setStock] = useState([]);
  const [info, setInfo] = useState(null);
  
  useEffect(() => {
    if(showColorModal){
      const { images, color, stock, info } = showColorModal;
      setImages(images.split(","));
      setColor(color);
      setStock(JSON.parse(stock));
      setInfo(JSON.parse(info));
    }
    
  }, [showColorModal]);



  return ( 
    <article className={`${styles.article} prodColorModal`} style={{right: showColorModal ? "0px" : "-100vw"}} onClick={()=> setShowColorModal(false)}>
      <div className={styles.div} onClick={(e)=> e.stopPropagation()}>
        <div className={styles.left}>
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              {
                images.length && images.map((image, index) => {
                  return(
                    <div class={`carousel-item ${index === 0 && "active"} ${info.brand === "Dolce & Gabbana" && "dolce"}`}>
                      <img src={image} alt="..." className='d-block w-100'/>
                    </div>
                  )
                })
              }
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className={styles.right}>
            <h4>{info?.name}</h4>
            <span className={styles.brand}>{info?.brand}</span>
            <p>{info?.description}</p>
            {
              stock.map(el => {
                if(el.color === color){
                  return(
                    <div className={styles.stocks}>
                      <span>Stock: {el.stock}</span>
                      <span>Sold: {el.sold}</span>
                    </div>
                  )
                }
              })
            }
        </div>
      </div>
    </article>
   );
}
 
export default ProdColorImg;