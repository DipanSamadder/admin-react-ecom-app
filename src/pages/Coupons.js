import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModel from "../components/CustomModel";
import { deleteCoupons, getCoupons } from "../features/coupon/couponSlice";
interface DataType {
  key: React.Key;
  name: string;
  expiry: string;
  discount: number;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "S.N.",
    dataIndex: "key",
    sorter: (a: DataType, b: DataType) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a: DataType, b: DataType) => a.name - b.name,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Coupons() {
  const dispatch = useDispatch();
  const getCoupon = useSelector((state) => state.coupon.data || []);
  const [open, setOpen] = useState(false);
  const [toastMessage, setTostMessage] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  const deleteCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, message, deleteCouponData } = deleteCoupon;

  const handleSubmit = (e) => {
    setConfirmLoading(true);
    setTostMessage(true);
    dispatch(deleteCoupons(deleteId));
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
      dispatch(getCoupons());
      setTostMessage(false);
      toast.success(message);
      setConfirmLoading(false);
      setOpen(false);
    }
  }, [message, deleteCouponData]);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const data: DataType[] = getCoupon.map((row, index) => ({
    key: index + 1,
    name: row.name,
    expiry: row.expiry,
    discount: row.discount,
    action: (
      <>
        <Link
          className="btn m-1 bg-primary text-white"
          to={`/admin/coupon/${row._id}`}
        >
          <FaRegEdit />
        </Link>
        <button
          className="btn m-1 bg-primary text-white"
          onClick={() => showModal(row._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-5">Coupons</h3>
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-12">
          <div className="tableproduct">
            <Table columns={columns} dataSource={data} onChange={onChange} />
            <CustomModel
              open={open}
              title="Coupon Delete"
              handleSubmit={handleSubmit}
              confirmLoading={confirmLoading}
              handleCancel={handleCancel}
              body="Are you want to delete?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
