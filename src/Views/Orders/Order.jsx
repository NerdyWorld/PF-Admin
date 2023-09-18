import React, { useEffect, useState } from 'react';
import './Orders.module.css';
import Swal from 'sweetalert2';
import { Table, Select , Modal,Carousel , Descriptions,Divider , Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FcFullTrash, FcAbout } from 'react-icons/fc';
import { getAllOrders, updateOrder, deleteOrder } from '../../Features/Orders/ordersSlice';

const OrdersList = () => {
  const state = useSelector((state) => state);
  const { orders, isError } = state.orders;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const carouselContainerStyle = {
    border: '4px solid #ccc', // Establece el ancho y el color del borde
    borderRadius: '10px', // Opcional: agrega esquinas redondeadas
    padding: '20px', // Opcional: agrega espacio interno al contenedor
    backgroundColor:'Lightgray',
  };

  useEffect(() => {
    // Fetch all orders when the component mounts
    dispatch(getAllOrders());
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      // Dispatch the updateOrder action with the new status
      await dispatch(updateOrder({ id: orderId, status: newStatus }));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      color: 'whitesmoke',
      icon: 'warning',
      iconColor: 'white',
      background: '#1f1f1f',
      buttonsStyling: false,
      title: `<p>Wait!</p>`,
      html: `
      <p>
        Are you sure you want to delete this order?
      </p>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#1f1f1f',
      showDenyButton: true,
      denyButtonText: 'No',
      denyButtonColor: 'grey',
      denyButtonAriaLabel: 'black',
      toast: true,
      customClass: {
        confirmButton: 'confirmSwalCheckout',
        denyButton: 'denySwalCheckout',
        title: 'swalTitle',
        htmlContainer: 'swalHtml',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(orderId));
        Swal.fire({
          icon: 'success',
          title: 'Order Deleted Successfully!',
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (result.isDenied) {
        return;
      }
    });
    
  };

  const handleShowOrderDetails = (orderId) => {
    // Busca la orden correspondiente por ID
    const foundOrder = orders.find((order) => order.id === orderId);
  
    if (foundOrder) {
      setSelectedOrderDetails(foundOrder);
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

 

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Released',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Quantity Items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (orderStatus, record) => (
        <Select
          style={{ width: '120px' }}
          defaultValue={orderStatus} // Establece el valor por defecto
          onChange={(newStatus) => handleUpdateOrderStatus(record.id, newStatus)}
        >
          <Select.Option value="Ordered">Ordered</Select.Option>
          <Select.Option value="Shipped">Shipped</Select.Option>
          <Select.Option value="Canceled">Canceled</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <FcFullTrash
            onClick={() => handleDeleteOrder(record.id)}
            style={{ color: 'red', marginRight: '8px', cursor: 'pointer' }}
          />
          <FcAbout
             onClick={() => handleShowOrderDetails(record.id)}
             style={{ color: 'blue', cursor: 'pointer' }}
          />
        </span>
      ),
    },
  ];

  const data = orders.map((order) => ({
    key: order.id,
    id: order.id,
    orderStatus: order.orderStatus,
    items: order.items.length,
    createdAt: order.createdAt,
    totalPrice: order.totalPrice

  }));

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null} // Esto elimina los botones de "Aceptar" y "Cancelar" en el modal
      >
        {/* Renderiza los detalles de la orden aquí */}
        {selectedOrderDetails && (
          <div>
            <Descriptions title="Order Details" bordered>
              
              
              <Descriptions.Item  style={{ display: 'block'}} label={<span style={{ fontWeight: 'bold', color: 'black'}}  >ID</span>}>
              {selectedOrderDetails.id}
              </Descriptions.Item>

              <Descriptions.Item label={<span style={{ fontWeight: 'bold' , color: 'black'}}  >Order Status:</span>} style={{ display: 'block' }} >{selectedOrderDetails.orderStatus}</Descriptions.Item>

              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black'}}  >Quantity Items:</span>} style={{ display: 'block' }}>{selectedOrderDetails.items.length}</Descriptions.Item>

              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black'}}  >Total Price:</span>} style={{ display: 'block' }}>{selectedOrderDetails.totalPrice}</Descriptions.Item>

              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black'}}  >UserID Owner:</span>} style={{ display: 'block' }}>{selectedOrderDetails.belongsTo}</Descriptions.Item>

              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black'}}  >Shipping Address:</span>} style={{ display: 'block' }}>{selectedOrderDetails.shippingAddress}</Descriptions.Item>

              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black'}}  >Billing Address</span>} style={{ display: 'block' }}>{selectedOrderDetails.billingAddress}</Descriptions.Item>

              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black'}}  >Shipping Method</span>} style={{ display: 'block' }}>{selectedOrderDetails.shippingMethod}</Descriptions.Item>

            </Descriptions>

            <Divider />

            {/* Carrusel */}
            <div style={carouselContainerStyle}>
              <Carousel autoplay autoplaySpeed={1500} pauseOnHover={true} className="custom-carousel">
                {selectedOrderDetails.items.map((item,index) => (
                  <div key={item.id} style={{ textAlign: 'center' }}>
                    <p><label style={{ fontWeight: 'bold' }}>ID:</label> <br/>{item.id}</p>
                    <p><label style={{ fontWeight: 'bold' }}>Name:</label> <br/> {item.name}</p>        
                    <p><label style={{ fontWeight: 'bold' }}>Brand:</label> <br/> {item.brand}</p>
                    <p><label style={{ fontWeight: 'bold' }}>Quantity:</label> <br/> {item.quantity}</p>
                    <p><label style={{ fontWeight: 'bold' }}>Number Item:</label> <br/> {index + 1}</p> {/* Muestra el índice */}
                    {/* Agrega más detalles según las propiedades de tu objeto de item */}
                    <img
                      src={item.images[0]}
                      alt={`Image ${item.id}`}
                      style={{ maxWidth: '100%', maxHeight: '250px', margin: '0 auto' }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default OrdersList;
