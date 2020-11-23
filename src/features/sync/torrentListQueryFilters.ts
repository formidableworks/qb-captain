import { History, Location } from 'history';
import queryString from 'query-string';

export interface TorrentListQueryFilters {
  tags: string[];
  categories: string[];
  states: string[];
}
export const getQueryFilters = (location: Location): TorrentListQueryFilters => {
  const qsData = queryString.parse(location.search, { arrayFormat: 'comma' });
  let tags: string[] = [];
  let categories: string[] = [];
  let states: string[] = [];
  if (qsData.tags) {
    tags = Array.isArray(qsData.tags) ? qsData.tags : [qsData.tags];
  }
  if (qsData.categories) {
    categories = Array.isArray(qsData.categories) ? qsData.categories : [qsData.categories];
  }
  if (qsData.states) {
    states = Array.isArray(qsData.states) ? qsData.states : [qsData.states];
  }
  return { ...qsData, tags, categories, states };
};

export const addQueryFilters = (
  addFilters: Partial<TorrentListQueryFilters>,
  history: History
): void => {
  const { tags: addTags = [], categories: addCats = [], states: addStates = [] } = addFilters;
  const { tags: prevTags, categories: prevCats, states: prevStates } = getQueryFilters(
    history.location
  );
  const mergedFilters = {
    tags: addTags.reduce((acc, tag) => (acc.includes(tag) ? acc : [...acc, tag]), prevTags),
    categories: addCats.reduce((acc, cat) => (acc.includes(cat) ? acc : [...acc, cat]), prevCats),
    states: addStates.reduce((acc, sta) => (acc.includes(sta) ? acc : [...acc, sta]), prevStates),
  };
  history.push({
    pathname: history.location.pathname,
    search: `?${queryString.stringify(mergedFilters, { arrayFormat: 'comma' })}`,
  });
};
export const removeQueryFilters = (
  filters: Partial<TorrentListQueryFilters>,
  history: History
): void => {
  const { tags: removeTags = [], categories: removeCats = [], states: removeStates = [] } = filters;
  const { tags: prevTags, categories: prevCats, states: prevStates } = getQueryFilters(
    history.location
  );
  const mergedFilters = {
    tags: prevTags.filter((tag) => !removeTags.includes(tag)),
    categories: prevCats.filter((cat) => !removeCats.includes(cat)),
    states: prevStates.filter((sta) => !removeStates.includes(sta)),
  };
  history.push({
    pathname: history.location.pathname,
    search: `?${queryString.stringify(mergedFilters, { arrayFormat: 'comma' })}`,
  });
};
