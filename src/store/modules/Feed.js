import db from '../../services/db'
import truncate from 'lodash.truncate'

const state = {
  feeds: []
}

const mutations = {
  LOAD_FEEDS (state, feed) {
    state.feeds = Object.freeze(feed.map((item) => {
      item.fulltitle = item.title
      item.title = truncate(item.title, { length: 22 })
      return item
    }))
  },
  ADD_FEED (state, docs) {
    db.addFeed(docs)
  },
  DELETE_FEED (state, id) {
    db.deleteFeed(id)
  },
  ORDER_FEEDS (state, feeds) {
    state.feeds = feeds
  },
  UPDATE_FEED_TITLE (state, data) {
    const index = state.feeds.findIndex(item => item.id === data.id)
    state.feeds[index].title = data.title
    state.feeds[index].category = data.category
  },
  UPDATE_FEED_CATEGORY (state, data) {
    const feeds = state.feeds.filter(item => item.category === data.old.title)
    for (let i = 0; i < feeds.length; i++) {
      const index = state.feeds.findIndex(item => item._id === feeds[i]._id)
      db.updateFeedCategory(state.feeds[index].id, data.new.title)
      state.feeds[index].category = data.new.title
    }
  }
}

const actions = {
  async loadFeeds ({ commit }) {
    commit('LOAD_FEEDS', await db.fetchFeeds())
  },
  addFeed ({ commit }, feed) {
    commit('ADD_FEED', feed)
  },
  async deleteFeed ({ dispatch, commit }, id) {
    console.log(id)
    await dispatch('deleteArticle', id)
    commit('DELETE_FEED', id)
  },
  orderFeeds ({ commit }, feeds) {
    commit('ORDER_FEEDS', feeds)
  },
  updateFeedCategory ({ commit }, data) {
    commit('UPDATE_FEED_CATEGORY', data)
  },
  updateFeedTitle ({ commit }, data) {
    db.updateFeedTitle(data.id, data.title, data.category)
    commit('UPDATE_FEED_TITLE', data)
  }
}

export default {
  state,
  mutations,
  actions
}
