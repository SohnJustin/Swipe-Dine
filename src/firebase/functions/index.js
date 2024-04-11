/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// prettier-ignore
const functions = require("firebase-functions");
// prettier-ignore
const cors = require("cors")({origin: true});
const axios = require("axios");

// prettier-ignore
exports.fetchDataFromYelp = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const { latitude, longitude, categories } = request.query;
      const apiKey = functions.config().yelp.key; // Accessing the Yelp API key
      const yelpResponse = await axios.get(
        "https://api.yelp.com/v3/businesses/search",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          params: { latitude, longitude, categories },
        }
      );

      response.json(yelpResponse.data);
    } catch (error) {
      console.error("Error fetching data from Yelp:", error);
      response.status(500).send("Internal Server Error");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
