import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands } from "../features/brand/brandSlice";

interface DataType {
  key: React.Key;
  image: string;
  title: string;
  shortDes: string;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "S.N",
    dataIndex: "key",
    sorter: (a: DateType, b: DateType) => a.key - b.key,
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: DateType, b: DateType) => a.title.localeCompare(b.title),
  },
  {
    title: "Short Des",
    dataIndex: "shortDes",
    sorter: (a: DateType, b: DateType) => a.shortDes - b.shortDes,
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

export default function BrandList() {
  const dispatch = useDispatch();

  const getBrandList = useSelector((state: any) => state.brand.brands || []);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const data: DataType[] = getBrandList.map((brand: any, index: any) => ({
    key: index + 1,
    image: (
      <img
        src={brand.images[0]?.url}
        alt={brand.images[0]?.public_id}
        className="listing-img-size"
      />
    ),
    title: brand.title,
    shortDes: brand.shortDes,
    action: (
      <>
        <Link
          className="btn m-1 bg-primary text-white"
          to={`/admin/brand/${brand._id}`}
        >
          <FaRegEdit />
        </Link>
        <Link className="btn m-1  bg-danger text-white" to="/delete/">
          <MdDelete />
        </Link>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-5">Brand List</h3>
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
