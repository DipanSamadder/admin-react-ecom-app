import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModel from "../components/CustomModel";
import { deleteProducts, getProducts } from "../features/product/productSlice";

interface DataType {
  key: React.Key;
  title: string;
  category: string | undefined;
  brand: string | undefined;
  slug: string;
  price: number; // Corrected the type to number
  images: string;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: DataType, b: DataType) => a.title.localeCompare(b.title),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a: DataType, b: DataType) =>
      (a.category || "").localeCompare(b.category || ""),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a: DataType, b: DataType) =>
      (a.brand || "").localeCompare(b.brand || ""),
  },
  {
    title: "Slug",
    dataIndex: "slug",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a: DataType, b: DataType) => a.price - b.price, // Numeric comparison
  },
  {
    title: "Images",
    dataIndex: "images",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function ProductList() {
  const dispatch = useDispatch();

  const productList = useSelector((state: any) => state.product.products);
  console.log(productList);

  const [open, setOpen] = useState(false);
  const [toastMessage, setTostMessage] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  const deleteAction = useSelector((state) => state.product);
  const { isSuccess, isError, message, deleteProData } = deleteAction;

  const handleSubmit = (e) => {
    setConfirmLoading(true);
    setTostMessage(true);
    dispatch(deleteProducts(deleteId));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
  };

  useEffect(() => {
    if (toastMessage && deleteId !== undefined && message !== undefined) {
      dispatch(getProducts());
      setTostMessage(false);
      toast.success(message);
      setConfirmLoading(false);
      setOpen(false);
    }
  }, [message, deleteProData]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const data: DataType[] = productList.map((product: any, index: number) => ({
    key: index,
    title: product.title,
    slug: product.slug,
    price: product.price,
    images: product.images && (
      <img
        src={product.images[0]?.url}
        alt={product.images[0]?.public_id}
        className="listing-img-size"
      />
    ),
    category: product.category,
    brand: product.brand,
    action: (
      <>
        <Link
          className="btn m-1 bg-primary text-white"
          to={`/admin/product/${product._id}`}
        >
          <FaRegEdit />
        </Link>
        <button
          className="btn m-1 bg-primary text-white"
          onClick={() => showModal(product._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-5">Product List</h3>
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-12">
          <div className="tableproduct">
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </div>
      <CustomModel
        open={open}
        title="Coupon Delete"
        handleSubmit={handleSubmit}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        body="Are you want to delete?"
      />
    </div>
  );
}
