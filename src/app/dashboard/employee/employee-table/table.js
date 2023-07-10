import { Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
  },
  {
    key: "2",
    name: "Jim Green",
  },
  {
    key: "3",
    name: "Joe Black",
  },
];

export default function EmpTable() {
  return <Table columns={columns} dataSource={data} showHeader={false} />;
}
