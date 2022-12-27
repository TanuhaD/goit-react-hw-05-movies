import axios from 'axios';

const axiosTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '5a2419fd63850feafab2665d44923974',
  },
});

export const fetchTrends = () => {
  return axiosTMDB.get('trending/movie/week');
};
export const fetchQuery = query => {
  return axiosTMDB.get(`search/movie`, { params: { query } });
};
export const fetchDetailsById = id => {
  return axiosTMDB.get(`/movie/${id}`);
};
export const fetchCastById = id => {
  return axiosTMDB.get(`/movie/${id}/credits`);
};
export const fetchReviewById = id => {
  return axiosTMDB.get(`/movie/${id}/reviews`);
};
