import React, { useContext } from 'react';
import styles from "./userCart.module.css";
import { GlobalContext } from '../../Context/globalContext';
import { useSelector } from 'react-redux';


const UserCartModal = () => {

  const globalContext = useContext(GlobalContext);
  const { showUserCartModal, setShowUserCartModal } = globalContext;

  const state = useSelector(state => state);
  const { user } = state.users;
  
  return ( 
    <article className={styles.article} style={{right: showUserCartModal ? "0" : "-100vw"}}>
      <div className={styles.div}>
        <div className={styles.container}>
          <div className={styles.close} onClick={()=> setShowUserCartModal(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className={styles.cartItems}>
            <div className='d-flex align-items-center gap-2 mb-3'>
              <h3>{user?.userName}'s Cart</h3>
              <i className="fa-solid fa-heart fa-xl" style={{color: "#d43e3e"}}></i>
            </div>
            {
              showUserCartModal && showUserCartModal.map((el, index) =>{
                return (
                  <div className={styles.itemContainer} style={{borderBottom: index !== showUserCartModal.length - 1 ? "1px solid #d3d3d353" : "none"}}>
                    <div className={styles.leftDiv}>
                      <div className={styles.itemImg}>
                        <img src={el.images[0].images[0]} alt="abc"/>
                      </div>
                      <div className={styles.itemDetails}>
                        <span className={styles.itemBrand}><b>{el.brand}</b></span>
                        <span className={styles.itemName}>{el.name.length > 27 ? el.name.slice(0, 26) + "…" : el.name}</span>
                        <div className={styles.itemColors}>
                        <span className={styles.colorSpan} style={{backgroundColor: el.color}}></span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.rightDiv}>
                      <span>${el.price}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default UserCartModal;
