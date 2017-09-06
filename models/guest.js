const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
  first_name: {
    type : String,
    required : [true, 'First name is required']
  },
  last_name: {
    type : String,
    required : [true, 'Last name is required']
  },
  family_name: {
    type : String,
    required : [true, 'Family name is required to differenciate between different families']
  },
  city: {
    type : String
  },
  secret_code: {
    type : String,
    default : 'secret'
  },
  invited_by : {
    type : String
  },
  event1 : {
    invited : {
      type : Boolean,
      default : false
    },
    rsvp : {
      type : String,
      default : "No Response"
    },
    modified: {
      type : Boolean,
      default : false
    }
  },
  event2 : {
    invited : {
      type : Boolean,
      default : false
    },
    rsvp : {
      type : String,
      default : "No Response"
    },
    modified: {
      type : Boolean,
      default : false
    }
  },
  event3 : {
    invited : {
      type : Boolean,
      default : false
    },
    rsvp : {
      type : String,
      default : "No Response"
    },
    modified: {
      type : Boolean,
      default : false
    }
  },
  event4 : {
    invited : {
      type : Boolean,
      default : false
    },
    rsvp : {
      type : String,
      default : "No Response"
    },
    modified: {
      type : Boolean,
      default : false
    }
  },
  event5 : {
    invited : {
      type : Boolean,
      default : false
    },
    rsvp : {
      type : String,
      default : "No Response"
    },
    modified: {
      type : Boolean,
      default : false
    }
  }

})


const Guest = mongoose.model('guest',GuestSchema);

module.exports = Guest;

// //Create geolocation Schema
// const GeoSchema = new Schema({
//   type: {
//     type: String,
//     default : "Point"
//   },
//   coordinates:{
//     type: [Number],
//     index: "2dsphere"
//   }
// })
//
// //Create ninjs Schema & Model
// const NinjaSchema = new Schema({
//   name: {
//     type : String,
//     required : [true, 'Name field is required'],
//   },
//   belt:{
//     type: String
//   },
//   available:{
//     type: Boolean,
//     default: false
//   },
//   geometry: GeoSchema
// });
//
// const Ninja  = mongoose.model('ninja', NinjaSchema);
//
// module.exports = Ninja;
