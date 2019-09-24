import { _, asArray } from '@cypherlab/js-utils'


class DataTable extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
        filter: props.filter || ''
      , max: 10
    }

    this.filterRef = React.createRef()

    this.onFilter = _.debounce(this.onFilter.bind(this), 300)
    this.filtered = this.filtered.bind(this)
    this.count = this.count.bind(this)
  }

  componentDidMount(){
    this.filterRef.current.value = this.state.filter
  }

  onFilter(newFilter) {
    // console.log('filter', newFilter)
    const { onFilter } = this.props
    onFilter && onFilter(newFilter)
    this.filterRef.current.value = newFilter
    this.setState({ filter: newFilter })
  }

  filtered() {
    const { data, searchKeys, hideNoQuery } = this.props
    const { filter, max } = this.state
    const filterKeys = asArray(searchKeys) 

    if(hideNoQuery && !filter) return []

    let filtered = _.filter(data, d => {
      let match
      for (let i = 0; i < filterKeys.length; i++) {
        if((d[filterKeys[i]]||'').match(new RegExp(filter, 'gi'))){ match = true; break; }
      }
      return match 
    })
    // console.log('filter', search, filter, filtered.length)
    // filtered = filtered.slice(0, max)
    return filtered
  }

  count(length) {
    const { data, hideNoQuery } = this.props
    const { filter } = this.state

    if(hideNoQuery && !filter) return data.length
    return length
    // return length == data.length ? length : `${length}/${data.length}`
  }

  render () {
    const { title, data, height, color, searchKeys, debug } = this.props
    const { filter } = this.state
    const filtered = this.filtered()

    return (<div className="box">

      { debug && <code className="d-block p-3">{JSON.stringify({ filter, result: filtered.length, searchKeys })}</code> }

      <div style={{background: color}} className="header d-flex justify-content-between align-items-center p-2 text-light">
        <div className="form-inline">
          <input ref={this.filterRef} onChange={e=>this.onFilter(e.target.value)} className="search-input form-control" type="search" placeholder="Search" />
          { !!filter.length && <i onClick={()=>this.onFilter('')} className="fa fa-times ml-2" /> }
        </div>
        <span>{title} ~ {this.count(filtered.length)} items</span>
      </div>

      <div className="table-container" style={{minHeight: height, maxHeight: height}}>
        <DataTableElement {...this.props} data={filtered} />
      </div>

      <style jsx="true">{`
        .box {
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
        }
        .table-container {
          overflow: scroll;
          border: 1px solid #dee2e6;
        }
        .search-input {
          max-width: 150px;
        }
      `}</style>

    </div>)
  }
}


const DataTableElement = ({ cols=[], data=[], max=10, dark, onClick, hideHead }) => (<div>
  <table className={`table table-sm table-striped ${dark?'table-dark':''}`}>

    { !hideHead && <thead>
      <tr>
        { cols.map((col, i) => <th key={i} className={col.class}>
          {col.name || col.key}
        </th>)}
      </tr>
    </thead>}

    <tbody>
      { data.map((item, i) => <tr key={i} onClick={()=>onClick(item)}>
        { cols.map((col, y) => <td key={y} className={col.class}>
          {(col.transform || (v => v))(_.get(item, col.key), item)}
        </td>)}
      </tr>)}
    </tbody>

  </table>
</div>)



const DataTableWrapper = ({ 
    data
  , cols
  , title=''
  , filter=''
  , searchKeys=['key']
  , onFilter=(f)=>{}
  , onClick=(i)=>console.log(i)
  , hideHead=false
  , hideNoQuery=false
  , height='400px'
  , color='#3592d6'
  , debug=false
} = {}) => (<div>
  <DataTable 
    data={data} 
    cols={cols}
    title={title}
    filter={filter}
    searchKeys={searchKeys}
    onFilter={onFilter}
    onClick={onClick}
    hideHead={hideHead}
    hideNoQuery={hideNoQuery}
    height={height}
    color={color}
    debug={debug}
  />
</div>)



export default DataTableWrapper
