import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_CHART_API_URL,
});

/**
 * It's used to get data property directly. For example
 *
 * Normal usage (await $axios.get('...')).data
 * Fetch style await $axios.$get('...')
 *
 * @param {*} url
 * @param {*} options
 * @returns Prmomise<any>
 */
instance.$get = (url = '', options = {}) => instance.get(url, options).then((response) => response.data);

export default instance;
