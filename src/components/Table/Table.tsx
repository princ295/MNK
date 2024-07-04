import React from "react";
import "./index.css";


export interface Column {
  label: string
  filed: string
}

interface TableProps {
  column: {
    label: string
    filed: string
  }[]
  data: any[]
}


export const Table: React.FC<TableProps> = ({ column, data }) => {

  return (
    <table border={1} width={1080}>
      <thead>
        <tr>
          {
            React.Children.toArray(
              column.map((col) => <th scope="col" align="center">{col.label}</th>)
            )
          }
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => <>
          {
            React.Children.toArray(
              <tr key={rowIndex}>
                {column.map((column) => <>{
                  React.Children.toArray(
                    <td align="center">
                      {column.filed === 'actions' ? (
                        <>
                          <button>Edit</button>                    </>
                      ) : (
                        row[column.filed as string]
                      )}
                    </td>
                  )
                }</>)}
              </tr>
            )
          }
        </>)}
      </tbody>
    </table>
  )
}