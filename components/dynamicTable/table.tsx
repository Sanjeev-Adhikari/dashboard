import React from "react";

interface Column {
  header: string; 
  accessor: string; 
  render?: (data: any, rowIndex?: number) => React.ReactNode; 
}

interface DynamicTableProps {
  data: Array<Record<string, any>>; 
  columns: Column[]; 
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data, columns }) => {
  return (
    <>
      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">SN</th>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b">
                <td className="px-6 py-4">{rowIndex + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {column.render
                      ? column.render(row[column.accessor], rowIndex)
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DynamicTable;
