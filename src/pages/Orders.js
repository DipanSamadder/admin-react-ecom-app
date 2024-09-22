import { Table } from "antd";
import React, { useEffect } from "react";
import { getOrderList } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Link from "antd/es/typography/Link";



interface DataType {
  key: React.Key;
  name: String,
  products: string;
  paymentIntent: Array;
  orderStatus: Object;
  createdAt: string;
  action:String;
}

const columns: ColumnsType<DataType> = [
  {
    title: "User name",
    dataIndex: "name",
    sorter: (a: DataType, b: DataType) => (a.name).localeCompare(b.name),
  },
  {
    title: "Products",
    dataIndex: "products",
  },
  {
    title: "Payment",
    dataIndex: "paymentIntent",
  },
  {
    title: "Status",
    dataIndex: "orderStatus",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Orders() {
  const dispatch = useDispatch();

  const orderList = useSelector((state: any) => state.order.data || []);
  console.log(orderList);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const data: DataType[] = orderList.map((row: any, index: number) => ({
    key: index,
    name: (
      <>
      {row.orderBy.firstname}<br/>
      <small>{row.orderBy.mobile}</small>
      </>
    ),
    products: row.products.map((prow, index)=>{
        return <p key={index}>{prow.product.title}</p>
    }),
    paymentIntent: row.paymentIntent.amount,
    orderStatus: row.orderStatus,
    createdAt: new Date(row.createdAt).toLocaleString(),
    action:(
      <>
        <Link className="btn m-1 bg-primary text-white" to="/edit/"><FaRegEdit /></Link>
        <Link className="btn m-1  bg-danger text-white" to="/delete/"><MdDelete /></Link>
      </>
    )
  }));
  return (
    <div>
      <h3 className="mb-5">Orders</h3>
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
