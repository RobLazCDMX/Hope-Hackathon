"use strict";
const request = require("request");
const express = require("express");
const axios = require("axios");
const router = express.Router(); // itinializes our router

const options = {
  url: "https://covid-1931.p.rapidapi.com/",
  method: "GET",
  headers: {
    "x-rapidapi-key": "8d3ff04f12mshf3fa785f31e11b5p1be5e8jsn247990048584",
    "x-rapidapi-host": "covid-1931.p.rapidapi.com",
    useQueryString: true,
  },
};

router.get("/", (req, res) => {
  const { states: state } = req.query;
  request(options, (err, response, body) => {
    if (err) {
      res.status(404).send("Could not find information");
    } else {
      const response = JSON.parse(body);
      console.log(response);
      const states = {};
      for (var i = 0; i < response[0].states.fields.length; i++) {
        var s = response[0].states.fields[i].mapValue.fields;
        states[s.state.stringValue.trim()] = {
          deaths: s.deaths.integerValue,
          possible: s.possible.integerValue,
          displayName: s.displayName.stringValue,
          recovered: s.recovered.integerValue,
          confirmed: s.confirmed.integerValue,
        };
      }
      console.log("states:", states);

      res.render("index", {
        states: Object.keys(states),
        state: states[state],
      });
    }
  });
});

module.exports = router;

// let stateConfirmed = JSON.parse(body)[0].states.fields.map((confirmed) => {  //Create a map array with just Confirmed Cases

//     console.log( confirmed.mapValue.fields.confirmed.integerValue)
//     return    confirmed.mapValue.fields.state.integerValue
// })
