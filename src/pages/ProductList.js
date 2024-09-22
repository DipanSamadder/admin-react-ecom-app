import { Table } from "antd";
import React, { useEffect } from "react";
import { getProducts } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Link from "antd/es/typography/Link";



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
    sorter: (a: DataType, b: DataType) => (a.category || "").localeCompare(b.category || ""),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a: DataType, b: DataType) => (a.brand || "" ).localeCompare(b.brand || ""),
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

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const data: DataType[] = productList.map((product: any, index: number) => ({
    key: index,
    title: product.title,
    slug: product.slug,
    price: product.price,
    images: product.images,
    category: product.category,
    brand: product.brand,
    action:(
      <>
        <Link className="btn m-1 bg-primary text-white" to="/edit/"><FaRegEdit /></Link>
        <Link className="btn m-1  bg-danger text-white" to="/delete/"><MdDelete /></Link>
      </>
    )
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
    </div>
  );
}
