const mongoose = require('mongoose')

class MongoContainer {
  constructor(model) {
    this.model = model
  }
  async connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/newTest_01')
      return true
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getAll() {
    try {
      const data = this.model.find({})
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async insert(data) {
    try {
      await this.model.create(data)
      return
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getById(id) {
    try {
      const data = await this.model.findById(id)
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async deleteById(id) {
    try {
      const data = await this.model.findByIdAndDelete(id)
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async deleteAll() {
    try {
      await this.model.deleteMany({})
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = MongoContainer
