import { axiosClient } from "./axiosClient"

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
    upcoming : "upcoming",
    popular : "popular",
    top_rated : "top_rated",
}

export const tvType = {
    upcoming : "upcoming",
    on_the_air : "on_the_air",
    top_rated : "top_rated",
}

const apiClient = {
    getMoviesList : (type, params) => {
        const url = `movie/${movieType[type]}`
        return axiosClient.get(url, params)
    },
    getTvList : (type, params) => {
        const url = `tv/${tvType[type]}`
        return axiosClient.get(url, params)
    },
    getTrending: (mediaType = "all", timeWindow = "day") => {
    const url = `trending/${mediaType}/${timeWindow}`;
    return axiosClient.get(url);
  },
  getDetails: (category,id, params = {}) => {
    const url = `${category}/${id}`;
    return axiosClient.get(url, { params });
  },

  getCredits: (category, id) => {
    const url = `${category}/${id}/credits`;
    return axiosClient.get(url);
    },

    getSimilar: (type, id, params = {}) => {
    const url = `${type}/${id}/similar`;
    return axiosClient.get(url, { params });
  },

  getVideo: (type, id, params = {}) => {
    const url = `${type}/${id}/videos`;
    return axiosClient.get(url, { params });
  },

  searchMovies: (query) => {
    const url = `/search/multi?query=${encodeURIComponent(query)}`;
    return axiosClient.get(url);
  },

  getPerson: (id) => {
    const url = `/person/${id}`;
    return axiosClient.get(url);
  },

  getPersonCredits : (id) => {
    const url = `/person/${id}/combined_credits`;
    return axiosClient.get(url);
  }

}

export default apiClient;