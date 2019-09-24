import React, { useState, useEffect } from 'react'
import Table from './index'


export default (props) => {

  const [tableProps, setTableProps] = useState({})

  useEffect(() => {
    (async () => {
      // for the data demonstration, we fetch a "words collection" from a github file
      const res = await fetch('https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt')
      const words = (await res.text()).split('\n')

      const newProps = {
        // data is an array containing actual data represented as pure objects
        // so we transform the fetched words collection (raw strings) into an objects collection
        // ex: ['foo', 'bar'] => [{ key: 'foo' }, { key: 'bar' }] 
          data: words.map(word => ({ word })) 

        // Define the columns properties
        , cols: [
              // 1st col will reflect the data object at key "word"
              { key: 'word', class: 'text-center w-25' }
              // 2st col name is called "word lentgh", and is transforming the final value
            , { key: 'word', name: 'word lentgh', transform: (v)=>`${v.length} letters` }
          ]

        // We instruct the component on which data keys should the filter operate
        // you can use multiple keys, comma separated: ex: 'key1,key2,foo.bar.key3,...'
        , searchKeys: 'word'

        // Give your table a name
        , title: 'My Table'

        // Enable debuging component, default to false
        , debug: false

        // Hide the table header, default to false
        , hideHead: false

        // if true, does not show any data when zero/no filter is applied
        , hideNoQuery: false
      }

      setTableProps(newProps)

    })()
  }, [])

  return (<div className="row col-8 py-5 m-auto">

    <div className="m-auto col-8">
      { tableProps.data && <Table {...tableProps} /> }
    </div>
    <div className="m-auto col-4">
      <small><pre>{ JSON.stringify({ ...tableProps, data: [] }, null, 2) }</pre></small>
    </div>

  </div>)
}






