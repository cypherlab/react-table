# `@cypherlab/react-table`


Advanced Table 

<a href="https://www.npmjs.com/package/@cypherlab/react-table">
  <img alt="npm" src="https://img.shields.io/npm/v/@cypherlab/react-table">
</a>

## Install
```
npm i @cypherlab/react-table
```


## Usage

```js
import Table from '@cypherlab/react-table'

// create some transform utility
const transformToFlag = (v, item) => (<img src={`/img/flags/${v}.png`} />)

const props = {
  data: [
      { name: 'bruce wayne', lang: 'en' }
    , { name: 'victor hugo', lang: 'fr' }
  ]

  cols: [
      { key: 'name', align: 'center' }
    , { key: 'country', path: 'lang', transform: transformToFlag }
  ]
}

// render
<Table {...props} />
```

## Table options

| option        | info                                                            |
|---------------|-----------------------------------------------------------------|
| data          | table data. `[{ foo: "bar" }, { foo: "bar" }]`. required        |
| cols          | table columns.`[{}, {}, ...]`. required                         |
| title         | table title                                                     |
| filter        | query filter                                                    |
| searchKeys    | comma separated. ex: `foo,name.first`. default: `key`           |
| onFilter      |                                                                 |
| onClick       |                                                                 |
| hideHead      | hide table <th>. default: `false`                               |
| hideNoQuery   | show empty table if no filter. default: `false`                 | 
| height        | table height. default: `400px`                                  |
| color         | table head color. default: `#3592d6`                            |


## Cols options

| option        | info                                                            |
|---------------|-----------------------------------------------------------------|
| key           | name of column                                                  |
| path          | default: `key`                                                  |
| class         | ex: `text-center w-25`                                          |
| transform     | (v, item) => [v, item[v]].join(',')                             |



## Test 

You can play with the component in the browser via the `index.html`.

```js
npm run dev
browse to http://localhost:8000/test/
```