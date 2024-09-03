import { Column } from "@ant-design/plots";
import type { TableColumnsType, TableProps } from "antd";
import { Table } from "antd";
import { default as React } from "react";

interface DataType {
  key: React.Key;
  name: string;
  chinese: number;
  math: number;
  english: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Chinese Score",
    dataIndex: "chinese",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Math Score",
    dataIndex: "math",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: "2",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: "3",
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: "4",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
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

const Dashboard = () => {
  const config = {
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json",
    },
    xField: "月份",
    yField: "月均降雨量",
    colorField: "goldenrod",
    group: true,
    style: {
      inset: 5,
    },
    onReady: ({ chart }) => {
      try {
        chart.on("afterrender", () => {
          chart.emit("legend:filter", {
            data: { channel: "color", values: ["London"] },
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
  };
  return (
    <div>
      <h3 className="mb-5">Dashboard</h3>
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-4">
          <div className="card p-4 shadow-sm">
            <p className="w-100 mb-3">Total sells</p>
            <div className="dashboard-card-details d-flex justify-content-between align-items-end">
              <h3>$3799.00</h3>
              <div className="text-end">
                <h6 className="m-0 p-0">37%</h6>
                <p className="m-0 p-0">Compared to April 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card p-4 shadow-sm">
            <p className="w-100 mb-3">Total sells</p>
            <div className="dashboard-card-details d-flex justify-content-between align-items-end">
              <h3>$3799.00</h3>
              <div className="text-end">
                <h6 className="m-0 p-0">37%</h6>
                <p className="m-0 p-0">Compared to April 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card p-4 shadow-sm">
            <p className="w-100 mb-3">Total sells</p>
            <div className="dashboard-card-details d-flex justify-content-between align-items-end">
              <h3>$3799.00</h3>
              <div className="text-end">
                <h6 className="m-0 p-0">37%</h6>
                <p className="m-0 p-0">Compared to April 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4 g-xl-5 mt-5">
        <div className="col-12 col-md-12">
          <h4>Sales Charts</h4>
          <div className="dashbard-charts w-100">
            <Column {...config} />
          </div>
        </div>
        <div className="col-12 col-md-12">
          <h4>Recent Sales</h4>
          <div className="tableproduct">
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
