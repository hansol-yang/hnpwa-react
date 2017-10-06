import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const getById = state => state.get('byId');
export const getCurrentPage = state => state.get('currentPage');
export const getItems = state => state.get('items');
export const getUser = state => state.get('user');

export const getFeedType = (_, props) => props.type;
export const getFeeds = createSelector(
  [getById, getCurrentPage, getItems, getFeedType],
  (byId, currentPage, items, type) => {
    const feeds = items.getIn([type, currentPage]);

    if (!feeds) return Immutable.List();

    return feeds.map(id => byId.get(id));
  },
);
export const getFeedCount = createSelector(
  getFeeds,
  feeds => feeds.size,
);

export const getUserId = (_, props) => props.user;
export const getSpecificUser = createSelector(
  [getUser, getUserId],
  (user, id) => {
    const information = user.get(id);

    if (!information) return null;
    return information;
  },
);

export const getComments = state => state.get('comments');
export const getCommentId = (_, props) => props.commentId;
export const getItemId = (_, props) => props.itemId;
export const getItem = createSelector(
  getComments,
  getItemId,
  (comments, itemId) => {
    const item = comments.get(itemId);

    if (!item) return null;
    return item;
  },
);
export const getChildrenComments = createSelector(
  getComments,
  getCommentId,
  (comments, commentId) => comments.getIn([commentId, 'comments']),
);
export const makeGetChildrenComments = () => createSelector(
  getComments,
  getCommentId,
  (comments, commentId) => comments.getIn([commentId, 'comments']),
);
export const makeGetCommentContents = () => createSelector(
  getComments,
  getCommentId,
  (comments, commentId) => comments.get(commentId),
);
