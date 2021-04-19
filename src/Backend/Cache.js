class Data {
  constructor(data) {
    this.data = data;
    this.time = Date.now();
  }
}

class Cache {
  constructor() {
    this.data = {};
    this.length = 0;
  }

  addCache(searchId, data) {
    if (!this.data[searchId]) {
      this.length++;
    }
    this.data[searchId] = new Data(data);
    this.cleanCache();
  }

  getCache(searchId) {
    if (this.data[searchId]) {
      return this.data[searchId].data;
    }
    return -1;
  }

  cleanCache() {
    while (this.length > 1024) {
      let oldest = null;
      for (const item in this.data) {
        if (oldest == null) {
          oldest = item;
        } else if (this.data[item].time < this.data[oldest].time) {
          oldest = item;
        }
      }
      this.length--;
      delete this.data[oldest];
    }
  }
}
