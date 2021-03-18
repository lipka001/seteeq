import axios from 'axios';

import hostPath from './constant'

export const fetchData = async (path, set) => {

    axios
      .get(`${hostPath}${path}`)
      .then(response => {
        set(response.data)
      })
      .catch(error => console.error(`There was an error: ${error}`))
  }

export const addRows = (value, columns, setRow) => {
    const key = columns[0].field;

    if (value) {
      const arrayRows = value.map(v => {
        return {
          id: v[key],
          ...v,
        }
      });

      setRow(arrayRows);
    }
  }