import React from "react";
//import styled from "styled-components";

// a11y: reach-ui focuses on a11y, multi-select coming soon
import Select from "react-select";
//import "react-select/dist/react-select.css";

import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Table.css";

// if data changes often, fetch from URL (axios) 
// if data set is huge, use a database
import pokedexData from '../data/pokedex.json'
// build unique types and weaknesses
const types = pokedexData.pokemon.reduce((tally,p)=>{
  return [...new Set( [...tally, ...p.type] )] // use a loop if perf becomes an issue
},[])
const weaknesses = pokedexData.pokemon.reduce((tally,p)=>{
  return [...new Set( [...tally, ...p.weaknesses] )]
},[])


const customSelectStyles = {
  menu: (provided, state) => ({
    ...provided,
    textAlign: 'left',
  }),
}

export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: pokedexData.pokemon,
      nameFilter: '',
      typesFilter: [],
      weaknessesFilter: [],
      filtered: [],
    };
  }

  onFilteredChangeCustom = (value, accessor) => {
    let filtered = this.state.filtered;
    let insertNewFilter = 1;
    
    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value });
    }

    this.setState({ filtered: filtered });
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <ReactTable
          data={data}
          filterable
          filtered={this.state.filtered}
          onFilteredChange={(filtered, column, value) => {
            console.log('onfilteredchange called')
            this.onFilteredChangeCustom(value, column.id || column.accessor);
          }}
          defaultFilterMethod={(filter, row, column) => {
            console.log('filter, row, column: ', filter, row, column)
            const id = filter.pivotId || filter.id;
            if (typeof filter.value === "object") {
              return row[id] !== undefined
                ? filter.value.indexOf(row[id]) > -1
                : true;
            } else {
              return row[id] !== undefined
                ? String(row[id]).indexOf(filter.value) > -1
                : true;
            }
          }}
          columns={[
            {
              Header: "Pokemon",
              columns: [
                {
                  Header: "Name",
                  accessor: "name",
                  Filter: () => (
                    <input 
                      type='text'
                      style={{width: '100%'}}
                      placeholder="Search ..."
                      value={this.state.nameFilter}
                      onChange={event => {
                        this.setState({
                          nameFilter: event.target.value.toLowerCase(),
                          filtered: [{id:'name',value:''}],
                        })

                        //this.onFilteredChangeCustom(
                        //  event.target.value.toLowerCase(),
                        //  "name"
                        //);
                      }}
                    />
                  ),
                  filterMethod: (filter, row) => {
                    //console.log('filter, row: ',filter,row)
                    //console.log('row[filter.id] filter.value: ',row[filter.id],filter.value)
                    return row[filter.id].toLowerCase().indexOf(filter.value) !== -1 
                  } 
                },
                {
                  Header: "Num",
                  id: "num",
                  accessor: "num",
                  filterable: false,
                }
              ]
            },
            {
              Header: "Characteristics",
              columns: [
                {
                  Header: "Type",
                  accessor: "type",
                  Cell: ({ value }) => {
                    //(value.sort().split(' '))
                    //console.log('type value: ',value)
                    return value.sort().join(', ')
                  },
                  Filter: ({ filter, onChange }) => {
                    return (
                      <Select
                        className=""
                        isMulti={true}
                        isSearchable={true}
                        placeholder="Select types ..."
                        styles={customSelectStyles}
                        value={this.state.typesFilter}
                        onChange={ selectedOptions => {
                          this.setState({ typesFilter: selectedOptions });
                          this.setState({ typesFilter: selectedOptions });
                          this.onFilteredChangeCustom(
                            selectedOptions.map(o => {
                              return o.value;
                            }),
                            "types"
                          );
                          // selectedOption can be null when the `x` (close) button is clicked
                          if (selectedOptions) {
                            //console.log('selected: ', selectedOptions);
                          }
                        }}
                        options={types.map((w, i) => {
                          //console.log('weakness value: ', w)
                          return { id: i, value: w, label: w };
                        })}
                      />
                    );
                  },
                  filterMethod: (filter, row) => {
                    console.log('filter, row: ',filter,row)
                    //console.log('row[filter.id] filter.value: ',row[filter.id],filter.value)
                    //return row[filter.id].toLowerCase().indexOf(filter.value) !== -1 
                    return false
                  } 

                },
                {
                  Header: "Weaknesses",
                  accessor: "weaknesses",
                  ttd: "mouseover see full line with ellipsis",
                  Cell: ({ value }) => {
                    //(value.sort().split(' '))
                    //console.log('type value: ',value)
                    return value.sort().join(', ')
                  },
                  Filter: ({ filter, onChange }) => {
                    return (
                      //styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      <Select
                        className=""
                        isMulti={true}
                        isSearchable={true}
                        placeholder="Select weaknesses ..."
                        styles={customSelectStyles}
                        value={this.state.weaknessesFilter}
                        onChange={ (selectedOption) => {
                          this.setState({ weaknessesFilter: selectedOption });
                          // selectedOption can be null when the `x` (close) button is clicked
                          if (selectedOption) {
                            //console.log('selected: ', selectedOption);
                          }
                        }}
                        options={weaknesses.map((w, i) => {
                          //console.log('weakness value: ', w)
                          return { id: i, value: w, label: w };
                        })}
                      />
                    );
                  },
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <pre>
          filters:

          {JSON.stringify(this.state.nameFilter, null, 2)}

          {JSON.stringify(this.state.typesFilter, null, 2)}

          {JSON.stringify(this.state.weaknessesFilter, null, 2)}

        </pre>
      </>
    );
  }
}

