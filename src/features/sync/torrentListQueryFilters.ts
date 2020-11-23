import { History, Location } from 'history';
import queryString from 'query-string';

export interface TorrentListQueryFilters {
  tags: string[];
  categories: string[];
  states: string[];
  s: string;
}
export const getQueryFilters = (location: Location): TorrentListQueryFilters => {
  const qsData = queryString.parse(location.search, {
    arrayFormat: 'comma',
  });
  let tags: string[] = [];
  let categories: string[] = [];
  let states: string[] = [];
  let s = '';
  if (qsData.tags) {
    tags = Array.isArray(qsData.tags) ? qsData.tags : [qsData.tags];
  }
  if (qsData.categories) {
    categories = Array.isArray(qsData.categories) ? qsData.categories : [qsData.categories];
  }
  if (qsData.states) {
    states = Array.isArray(qsData.states) ? qsData.states : [qsData.states];
  }
  if (qsData.s) {
    s = Array.isArray(qsData.s) ? '' : qsData.s;
  }
  return { ...qsData, tags, categories, states, s };
};

export const addQueryFilters = (
  addFilters: Partial<TorrentListQueryFilters>,
  history: History
): void => {
  const {
    tags: addTags = [],
    categories: addCats = [],
    states: addStates = [],
    s: addS,
  } = addFilters;
  const { tags: prevTags, categories: prevCats, states: prevStates, s: prevS } = getQueryFilters(
    history.location
  );
  const mergedFilters = {
    tags: addTags.reduce((acc, tag) => (acc.includes(tag) ? acc : [...acc, tag]), prevTags),
    categories: addCats.reduce((acc, cat) => (acc.includes(cat) ? acc : [...acc, cat]), prevCats),
    states: addStates.reduce((acc, sta) => (acc.includes(sta) ? acc : [...acc, sta]), prevStates),
    s: addS === undefined ? prevS : addS,
  };
  history.push({
    pathname: history.location.pathname,
    search: `?${queryString.stringify(mergedFilters, {
      arrayFormat: 'comma',
      skipEmptyString: true,
    })}`,
  });
};
export const removeQueryFilters = (
  filters: Partial<TorrentListQueryFilters>,
  history: History
): void => {
  const { tags: removeTags = [], categories: removeCats = [], states: removeStates = [] } = filters;
  const { tags: prevTags, categories: prevCats, states: prevStates, s: prevS } = getQueryFilters(
    history.location
  );
  const mergedFilters = {
    tags: prevTags.filter((tag) => !removeTags.includes(tag)),
    categories: prevCats.filter((cat) => !removeCats.includes(cat)),
    states: prevStates.filter((sta) => !removeStates.includes(sta)),
    s: prevS,
  };
  history.push({
    pathname: history.location.pathname,
    search: `?${queryString.stringify(mergedFilters, {
      arrayFormat: 'comma',
      skipEmptyString: true,
    })}`,
  });
};
