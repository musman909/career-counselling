import React from 'react';
import classes from './CustomTable.module.css';

const CustomTable = (props) => {
  const tableHeadings = ['#', ...Object.keys(props.tableData[0])];

  return (
    <table className={classes.CustomTable}>
      <thead>
        <tr>
          {tableHeadings.map((heading, i) => (
            <th key={i}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.tableData.map((data, i) => (
          <tr key={i}>
            {tableHeadings.map((heading, i2) => {
              if (heading === '#') {
                return <td key={i2}>{i + 1}</td>;
              }
              return <td key={i2}>{data[heading]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
