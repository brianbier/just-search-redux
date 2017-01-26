const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  placeId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  placeName: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

module.exports = mongoose.model('Favorite', FavoriteSchema);
