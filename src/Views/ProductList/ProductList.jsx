import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ProductList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { FcFullTrash, FcCancel, FcApproval, FcInfo } from "react-icons/fc";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import uniqId from "uniqid";
import { Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { GlobalContext } from "../../Context/globalContext";
import ProdColorImg from "../../Modals/productColorImages/prodColorImg";
import {
  deleteProduct,
  getAllProducts,
} from "../../Features/Products/productSlice";

import { Toast } from "primereact/toast";

const ProductList = () => {
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setShowColorModal } = globalContext;

  const state = useSelector((state) => state);
  const { products, message, isLoading } = state.products;
  const dispatch = useDispatch();

  // SEARCH FUNCTIONALITY
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const refToast = useRef();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (productId) => {
    Swal.fire({
      color: "whitesmoke",
      icon: "warning",
      iconColor: "white",
      background: "#1f1f1f",
      buttonsStyling: false,
      title: `<p>Wow wow!</p>`,
      html: `
      <p>
        Are you sure you want to delete this product?
      </p>
      `,
      showConfirmButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#1f1f1f",
      showDenyButton: true,
      denyButtonText: "No",
      denyButtonColor: "grey",
      denyButtonAriaLabel: "black",
      toast: true,
      customClass: {
        confirmButton: "confirmSwalCheckout",
        denyButton: "denySwalCheckout",
        title: "swalTitle",
        htmlContainer: "swalHtml",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(productId));
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("name"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.brand < b.brand) {
          return -1;
        }
        if (a.brand > b.brand) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.sku < b.sku) {
          return -1;
        }
        if (a.sku > b.sku) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("sku"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.category < b.category) {
          return -1;
        }
        if (a.category > b.category) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("category"),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.genre < b.genre) {
          return -1;
        }
        if (a.genre > b.genre) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (message === "Delete Product Success") {
      refToast.current.show({
        life: 3000,
        severity: "success",
        summary: "Success",
        detail: message,
      });
    } else if (message === "Delete Product Error") {
      refToast.current.show({
        life: 3000,
        severity: "error",
        summary: "Error",
        detail: "Failed to Delete the Product",
      });
    }

    if (products.length) {
      let newDataSource = [];

      for (let i = 0; i < products.length; i++) {
        // Save global variable
        const el = products[i];

        // Colors Stock Sum
        let totalStock = 0;
        if (Array.isArray(el.stock)) {
          el.stock.map((item) => (totalStock += parseInt(item.stock)));
        } else {
          // Trata el caso en que `el.stock` no es un array (puede ser `null` o indefinido)
          // Aquí puedes manejarlo según tus necesidades, por ejemplo, asignar 0 a `totalStock`.
          totalStock = 0;
        }

        // Sizes
        let sizes = "";
        el.sizes.map((size) => (sizes += `${size} • `));

        // Genre
        const findGenre = el.categories.find(
          (el) => el === "Women" || el === "Man"
        );

        newDataSource.push({
          name: el.name.trim(),
          brand: el.brand,
          stock: totalStock,
          price: <b>{"$" + el.price}</b>,
          genre: findGenre,
          category: el.categories[0],
          sizes,
          sku: el.SKU,
          colors: (
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {Array.isArray(el.images)
                ? el.images.map((item) => (
                    <span
                      className={styles.colorSpan}
                      style={{
                        backgroundColor: item.color,
                        cursor: "pointer",
                        border:
                          item.color.toLowerCase() === "white"
                            ? "1px solid lightgrey"
                            : "none",
                      }}
                      data-images={item.images}
                      data-color={item.color}
                      data-stock={JSON.stringify(el.stock)}
                      data-info={JSON.stringify({
                        name: el.name,
                        brand: el.brand,
                        description: el.description,
                      })}
                      onClick={(e) =>
                        setShowColorModal({
                          images: e.target.dataset.images,
                          color: e.target.dataset.color,
                          stock: e.target.dataset.stock,
                          info: e.target.dataset.info,
                        })
                      }
                    ></span>
                  ))
                : null}
            </div>
          ),
          actions: (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(el.id)}
            >
              {isLoading ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <FcFullTrash size={19} />
                </div>
              )}
            </div>
          ),
        });
      }

      setDataSource(newDataSource);
    }
  }, [products, message, isLoading]);

  return (
    <div className={styles.wrapper}>
      <Toast ref={refToast} position="top-left"></Toast>
      <ProdColorImg />
      <h3>Products List</h3>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProductList;
