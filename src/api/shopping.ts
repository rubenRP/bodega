import axios from 'axios'

const searchParams = {
  engine: 'google',
  google_domain: 'google.es',
  q: '',
  device: 'desktop',
  tbm: 'shop',
  location: 'Madrid, Community of Madrid, Spain',
  hl: 'es',
  gl: 'es',
  num: '100',
  api_key: <string>import.meta.env.VITE_SERPAPI_KEY,
}

const getParams = {
  engine: 'google_product',
  product_id: '',
  gl: 'es',
  hl: 'es',
  google_domain: 'google.es',
  location: 'Madrid, Community of Madrid, Spain',
  device: 'desktop',
  api_key: <string>import.meta.env.VITE_SERPAPI_KEY,
}

const searchForBottle = async (query: string) => {
  searchParams.q = query
  return axios.get('/serpapi/search', {
    params: searchParams,
  })
}

const getBottle = async (id: string) => {
  getParams.product_id = id
  return axios.get('/serpapi/search', {
    params: getParams,
  })
}

export { searchForBottle, getBottle }
