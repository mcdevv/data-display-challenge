import { useLocation, useHistory } from "react-router-dom"

const parseQuery = (search) => {
  const params = new URLSearchParams(search);
  const entries = params.entries();
  const object = {};
  for (const [key, value] of entries) {
    //console.log('key,value: ',key,value)
    object[key] = encodeURIComponent(value)//JSON.parse(value);
  }
  return object;
}

const buildSearch = (state,action,stateKeysForQuery) => {
  const itemsForQuery = Object.keys(action.items)
  .filter(key => stateKeysForQuery.includes(key))
  .reduce((tally, key) => {
    return { ...tally, [key]: action.items[key] }
  }, {})
  switch (action.type) {
    case 'update': return stringifyQuery({...state,...itemsForQuery})
    case 'replace': return stringifyQuery(itemsForQuery)
    case 'reset': return ''
    default: return ''
  }
}
const stringifyQuery = (query) => {
  return new URLSearchParams(query).toString();
}

export default (
  [state, dispatch], 
  method = "replace",
  stateKeysForQuery = []
) => {
  const history = useHistory();
  const { search, pathname, hash } = useLocation();
  const hasParams = search.indexOf("=") > -1;
  const dispatchWithQuery = (action) => {
    const search = buildSearch(state, action, stateKeysForQuery);
    dispatch(action);
    history[method](pathname + "?" + search + hash);
  };
  return [
    hasParams ? { ...state, ...parseQuery(search) } : state,
    dispatchWithQuery
  ];
}