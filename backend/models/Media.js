const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  adult: { type: Boolean, default: false },
  backdrop_path: { type: String },
  belongs_to_collection: {
    id: { type: Number },
    name: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String }
  },
  budget: { type: Number },
  genres: [{ id: { type: Number }, name: { type: String } }],
  homepage: { type: String },
  tmdb_id: { type: Number, required: true },
  imdb_id: { type: String },
  origin_country: [{ type: String }],
  original_language: { type: String },
  original_title: { type: String },
  original_name: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  production_companies: [{
    id: { type: Number },
    logo_path: { type: String },
    name: { type: String },
    origin_country: { type: String }
  }],
  production_countries: [{ iso_3166_1: { type: String }, name: { type: String } }],
  release_date: { type: String },
  revenue: { type: Number },
  runtime: { type: Number },
  spoken_languages: [{ english_name: { type: String }, iso_639_1: { type: String }, name: { type: String } }],
  status: { type: String },
  tagline: { type: String },
  title: { type: String },
  video: { type: Boolean, default: false },
  vote_average: { type: Number },
  vote_count: { type: Number },
  created_by: [{
    id: { type: Number },
    credit_id: { type: String },
    name: { type: String },
    original_name: { type: String },
    gender: { type: Number },
    profile_path: { type: String }
  }],
  episode_run_time: [{ type: Number }],
  first_air_date: { type: String },
  in_production: { type: Boolean },
  languages: [{ type: String }],
  last_air_date: { type: String },
  last_episode_to_air: {
    id: { type: Number },
    name: { type: String },
    overview: { type: String },
    vote_average: { type: Number },
    vote_count: { type: Number },
    air_date: { type: String },
    episode_number: { type: Number },
    episode_type: { type: String },
    production_code: { type: String },
    runtime: { type: Number },
    season_number: { type: Number },
    show_id: { type: Number },
    still_path: { type: String }
  },
  name: { type: String },
  next_episode_to_air: { type: Schema.Types.Mixed },
  networks: [{
    id: { type: Number },
    logo_path: { type: String },
    name: { type: String },
    origin_country: { type: String }
  }],
  number_of_episodes: { type: Number },
  number_of_seasons: { type: Number },
  seasons: [{
    air_date: { type: String },
    episode_count: { type: Number },
    id: { type: Number },
    name: { type: String },
    overview: { type: String },
    poster_path: { type: String },
    season_number: { type: Number },
    vote_average: { type: Number }
  }],
  mediaType: { type: String, enum: ['movie', 'tv'], required: true },
  isBlacklisted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Media', MediaSchema);
