const mongoose = require('mongoose')
const logger = require('../../logger')

class MongoContainer {
  constructor (model) {
    this.model = model
  }
  static async connect () {
    try {
      await mongoose.connect(process.env.urlMongo)
      return true
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getAll () {
    try {
      const data = this.model.find({})
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async insert (data) {
    try {
      await this.model.create(data)
      return
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getById (id) {
    try {
      const data = await this.model.findById(id)
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async deleteById (id) {
    try {
      const data = await this.model.findByIdAndDelete(id)
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async updateById (id, newData) {
    try {
      const data = await this.model.findByIdAndUpdate(id, newData, {
        upsert: true
      })
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async updateByField (field, fieldValue, newData) {
    try {
      const data = await this.model.findOneAndUpdate(
        { [field]: fieldValue },
        newData,
        {
          upsert: true
        }
      )
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getByUserId (userId) {
    try {
      const data = await this.model.find({ userId })

      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getByField (value, field) {
    try {
      const query = { [field]: value }
      const data = await this.model.find(query)
      return data
    } catch (error) {
      throw new Error(e.message)
    }
  }
  async deleteAll () {
    try {
      await this.model.deleteMany({})
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = MongoContainer
