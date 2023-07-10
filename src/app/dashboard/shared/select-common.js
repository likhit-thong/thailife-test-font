import { Select } from "antd";

export default function Selection({
  title,
  contents = [],
  elmValue,
  onChange,
  isRequired,
}) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    onChange(value);
  };
  const handleSearch = (value) => {
    console.log("search:", value);
    onChange(value);
  };

  return (
    <Select
      showSearch
      placeholder={title}
      optionFilterProp="children"
      status={isRequired ? "error" : ""}
      value={elmValue}
      onChange={handleChange}
      onSearch={handleSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={contents}
    />
  );
}
