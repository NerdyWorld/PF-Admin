import React, { useContext, useEffect } from 'react';
import styles from "./userFavs.module.css";
import { GlobalContext } from '../../Context/globalContext';
import { useSelector } from 'react-redux';


const UserFavsModal = () => {

  const globalContext = useContext(GlobalContext);
  const { showUserFavsModal, setShowUserFavsModal } = globalContext;

  const state = useSelector(state => state);
  const { user } = state.users;

  useEffect(() => {
    console.log(showUserFavsModal);
  }, [showUserFavsModal]);
  
  return ( 
    <article className={styles.article} style={{right: showUserFavsModal ? "0" : "-100vw"}}>
      <div className={styles.div}>
        <div className={styles.container}>
          <div className={styles.close} onClick={()=> setShowUserFavsModal(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className={styles.favItems}>
            <div className='d-flex align-items-center gap-2 mb-3'>
              <h3>{user?.userName}'s WishList</h3>
              <i className="fa-solid fa-heart fa-xl" style={{color: "#d43e3e"}}></i>
            </div>
            {
              showUserFavsModal.length && showUserFavsModal.map((el, index) =>{
                return (
                  <div className={styles.itemContainer} style={{borderBottom: index !== showUserFavsModal.length - 1 ? "1px solid #d3d3d353" : "none"}}>
                    <div className={styles.leftDiv}>
                      <div className={styles.itemImg}>
                        <img src={el.images[0].images[0]} alt="abc"/>
                      </div>
                      <div className={styles.itemDetails}>
                        <span className={styles.itemBrand}><b>{el.brand}</b></span>
                        <span className={styles.itemName}>{el.name.length > 27 ? el.name.slice(0, 26) + "…" : el.name}</span>
                        <div className={styles.itemColors}>
                          {
                            el.colors.map(color => <span className={styles.colorSpan} style={{backgroundColor: color}}></span>)
                          }
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
 
export default UserFavsModal;