const express = require('express');
const router = express.Router();
const Guest = require('../models/guest');
const csv = require('csv-parser');
const fs = require('fs');
const bluebird = require('bluebird');
const event_List = [];


// Upload the guest csv file
router.post('/upload',function(req,res,next){
 let fileName = req.files.filename;
 let event_headers = [];
   fileName.mv( __dirname + '/../uploads/guest.csv')
    .then(function(){
      fs.createReadStream(__dirname+'/../uploads/guest.csv')
      .pipe(csv())
      .on('headers',function(headerList){
        headerList.map(function(header,index){
          if(index >= headerList.length - 4){
            event_List.push(header)
          }
        })
      })
      .on('data',function(data){
        let guest = new Guest({
          first_name : data.first_name,
          last_name : data.last_name,
          family_name : data.family_name,
          invited_by : data.invited_by,
          city: data.city,
          secret_code : data.secret_code,
          event1 : {
            invited : data.event1 === 'TRUE' || data.event1 === 'true'
          },
          event2 : {
            invited : data.event2 === 'TRUE' || data.event2 === 'true'
          },
          event3 : {
            invited : data.event3 === 'TRUE' || data.event3 === 'true'
          },
          event4 : {
            invited : data.event4 === 'TRUE' || data.event4 === 'true'
          },
          event5 : {
            invited : data.event5 === 'TRUE' || data.event5 === 'true'
          }
        });
        return guest.save(Guest);
      })
      .then(function(data){
        console.log(data);
      })
      .on('end',function(){
        res.end();
      })
    })
    .catch(function(err){
      res.status(500).send(err);
    })
  });

//Delete all guests
router.post('/deleteallguests',function(req,res){
  Guest.remove()
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    })
})

// Add single Guest
router.post('/addsingleguest',function(req,res){
  var data = req.body;
  console.log(data);
  let guest = new Guest({
    first_name : data.first_name,
    last_name : data.last_name,
    family_name : data.family_name,
    invited_by : data.invited_by,
    city: data.city,
    secret_code : data.secret_code,
    event1 : {
      invited : data.event1 === 'TRUE' || data.event1 === 'true'
    },
    event2 : {
      invited : data.event2 === 'TRUE' || data.event2 === 'true'
    },
    event3 : {
      invited : data.event3 === 'TRUE' || data.event3 === 'true'
    },
    event4 : {
      invited : data.event4 === 'TRUE' || data.event4 === 'true'
    },
    event5 : {
      invited : data.event5 === 'TRUE' || data.event5 === 'true'
    }
  });
  guest.save(Guest)
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    console.log("err",err);
  });
})

// Retrieve all guests
router.get('/allguests',function(req,res,next){
  Guest.find()
  .then(function(data){
    console.log(data);
    res.send(data);
  })
  .catch(function(err){
    console.log("Error", err);
  });
});


// Search Guest Family based on the userinput
router.get('/searchguests',function(req,res){
    Guest.find({
      $and:[
        {'first_name' : { $regex : new RegExp('\\b' + req.query.first_name + '\\b', "i") }},
        {'last_name' : { $regex : new RegExp('\\b' + req.query.last_name + '\\b', "i") }}
      ]
      })
        .then(function(data){
          return bluebird.map(data,function(guest){
          return Guest.find({'family_name' : guest.family_name});
          });
        })
        .then(function(data){
          console.log(data);
          res.send(data);
        })
        .catch(function(err){
          console.log(err.stack);
        });
    });

    // RSVPing a guest
    router.post('/rsvpguest',function(request,response){
      let guests = request.body;
      bluebird.map(guests,function(guest){
        return Guest.update(
          {'_id':guest._id},
            {
              $set:
              {
              'event1': {'rsvp' : guest.event1},
              'event2': {'rsvp' : guest.event2},
              'event3': {'rsvp' : guest.event3},
              'event4': {'rsvp' : guest.event4},
              'event5': {'rsvp' : guest.event5}
              }
            }
        );
      })
      .then(function(data){
        response.send(data);
      })
      .catch(function(err){
        console.log("Err",err);
      });
    });

    
//Update a ninja in the database
router.put('/ninjas/:id',function(req,res,next){
  Ninja.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(function(){
      return Ninja.findOne({_id:req.params.id});
    })
    .then(function(ninja){
      res.send(ninja);
    })
    .catch(next);
})

// Delete a ninja from the database
router.delete('/ninjas/:id',function(req,res,next){
  Ninja.findByIdAndRemove({_id:req.params.id})
    .then(function(ninja){
      res.send(ninja);
    })
    .catch(next);
})

module.exports = router;
