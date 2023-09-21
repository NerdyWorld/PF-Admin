import React, { useEffect, useState, useRef } from 'react';
import './Orders.module.css';
import Swal from 'sweetalert2';
import { Table, Select, Modal, Carousel, Descriptions, Divider, Button, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FcFullTrash, FcAbout } from 'react-icons/fc';
import { getAllOrders, updateOrder, deleteOrder } from '../../Features/Orders/ordersSlice';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const OrdersList = () => {
  const state = useSelector((state) => state);
  const { orders, isError } = state.orders;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const carouselContainerStyle = {
    border: '4px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'Lightgray',
  };

  // Estados y funciones para la búsqueda
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
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
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Client',
      dataIndex: 'fullname',
      key: 'fullname',
      ...getColumnSearchProps('fullname'), 
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
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        if (a.totalPrice < b.totalPrice) {
          return -1;
        }
        if (a.totalPrice > b.totalPrice) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Quantity Items',
      dataIndex: 'items',
      key: 'items',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        if (a.items < b.items) {
          return -1;
        }
        if (a.items > b.items) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (orderStatus, record) => (
        <Select
          style={{ width: '120px' }}
          defaultValue={orderStatus}
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
    totalPrice: order.totalPrice,
    fullname: 'cliente1',
  }));

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedOrderDetails && (
          <div>
            <Descriptions title="Order Details" bordered>
              <Descriptions.Item style={{ display: 'block' }} label={<span style={{ fontWeight: 'bold', color: 'black' }}>ID</span>}>
                {selectedOrderDetails.id}
              </Descriptions.Item>
              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black' }}>Order Status:</span>} style={{ display: 'block' }}>{selectedOrderDetails.orderStatus}</Descriptions.Item>
              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black' }}>Quantity Items:</span>} style={{ display: 'block' }}>{selectedOrderDetails.items.length}</Descriptions.Item>
              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black' }}>Total Price:</span>} style={{ display: 'block' }}>{selectedOrderDetails.totalPrice}</Descriptions.Item>
              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black' }}>UserID Owner:</span>} style={{ display: 'block' }}>{selectedOrderDetails.belongsTo}</Descriptions.Item>
              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black' }}>Shipping Address:</span>} style={{ display: 'block' }}>{selectedOrderDetails.shippingAddress}</Descriptions.Item>
              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black' }}>Billing Address</span>} style={{ display: 'block' }}>{selectedOrderDetails.billingAddress}</Descriptions.Item>
              <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: 'black' }}>Shipping Method</span>} style={{ display: 'block' }}>{selectedOrderDetails.shippingMethod}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <div style={carouselContainerStyle}>
              <Carousel autoplay autoplaySpeed={1500} pauseOnHover={true} className="custom-carousel">
                {selectedOrderDetails.items.map((item, index) => (
                  <div key={item.id} style={{ textAlign: 'center' }}>
                    <p><label style={{ fontWeight: 'bold' }}>ID:</label> <br/>{item.id}</p>
                    <p><label style={{ fontWeight: 'bold' }}>Name:</label> <br/> {item.name}</p>
                    <p><label style={{ fontWeight: 'bold' }}>Brand:</label> <br/> {item.brand}</p>
                    <p><label style={{ fontWeight: 'bold' }}>Quantity:</label> <br/> {item.quantity}</p>
                    <p><label style={{ fontWeight: 'bold' }}>Number Item:</label> <br/> {index + 1}</p>
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
