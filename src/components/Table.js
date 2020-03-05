import React from "react";

import styled from "styled-components";
import tw from "tailwind.macro";

import { useTable, useFilters, useGlobalFilter } from "react-table";

import Select from "react-select";

// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";

// if data changes often, fetch from URL (axios) 
// if data set is huge, use a database
import pokedexData from '../data/pokedex.json'
// build unique types and weaknesses
const types = pokedexData.pokemon.reduce((tally,p)=>{
  return [...new Set( [...tally, ...p.type] )] // use a loop if perf becomes an issue
},[]).sort()
const weaknesses = pokedexData.pokemon.reduce((tally,p)=>{
  return [...new Set( [...tally, ...p.weaknesses] )]
},[]).sort()

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid gray;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      vertical-align: top;
      :last-child {
        border-right: 0;
      }
      white-space: nowrap;
    }
  }
  .select-column-filter-multi {
    min-width: 13rem;
    max-width: 21rem;
  }
  .pagination {
    padding: 0.5rem;
  }
`;

// Define a default UI for filtering
const  DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records ...`}
      style={{
        //fontSize: "1rem",
        fontWeight: '700',
        color: '#808080',
        border: "1px solid gray",
      }}
    />
  );
}


// Filter on multiple items
const SelectColumnFilterMulti = (options) => ({column}) => {
  const { filterValue, setFilter, preFilteredRows, id } = column;
  const customSelectStyles = {
    menu: (provided, state) => ({
      ...provided,
      textAlign: 'left',
      width: '500px',
    }),
  }
  // Render a multi-select box
  return (
    <Select
      className="select-column-filter-multi"
      isMulti={true}
      isSearchable={true}
      placeholder="Select ..."
      styles={customSelectStyles}
      value={filterValue}
      onChange={selectedOptions => {
        setFilter(selectedOptions);
      }}
      options={options.map((w, i) => {
          //console.log('weakness value: ', w)
          return { id: i+1, value: w, label: w };
        })
      }
    />
  );
}

// Add a new fuzzyTextFilterFn filter type.
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;


function arrayIncludesAllOfFilterFn(rows, id, filterValue) {
  console.log(rows, id, filterValue)
  return rows.filter(row => {
    const rowValue = row.values[id];
    console.log(rowValue,filterValue)
    if (rowValue === undefined) return true;
    if (typeof filterValue === 'string' || filterValue instanceof String) {
      return rowValue.includes(filterValue);
    }
    if (Array.isArray(filterValue)) {
      // [].every() returns true if every element passes the test
      // [].includes() returns true if the element is a member of rowValue
      return filterValue.every(element => rowValue.includes(element.value));
    }
    return true;
  });
}
//arrayIncludesAllOfFilterFn.autoRemove = val => !val;


const Table = ({ columns, data }) => {

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      arrayIncludesAllOf: arrayIncludesAllOfFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );


  return (
    <>
      <table className="table table-striped" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>The below visible to Web dev team only:</div>
      <div>
        <pre>
          <code>Filters: {JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}

export default () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Pokemon",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            filter: "fuzzyText",
          },
          {
            Header: "Number",
            accessor: "num",
            disableFilters: true,
          }
        ]
      },
      {
        Header: "Characteristics",
        columns: [
          {
            Header: "Type",
            accessor: "type",
            Cell: ({ cell: { value } }) => value.join(', '),
            Filter: SelectColumnFilterMulti(types),
            filter: "arrayIncludesAllOf",
          },
          {
            Header: "Weaknesses",
            accessor: "weaknesses",
            Cell: ({ cell: { value } }) => value.join(', '),
            Filter: SelectColumnFilterMulti(weaknesses),
            filter: "arrayIncludesAllOf",
          },
        ]
      }
    ],
    []
  );

  const data = pokedexData.pokemon;

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}


