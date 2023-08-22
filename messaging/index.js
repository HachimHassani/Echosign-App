const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configure AWS SDK with your credentials and region

AWS.config.update({ region: 'us-east-1' });

// Initialize CognitoIdentityServiceProvider
const cognito = new AWS.CognitoIdentityServiceProvider();

// Define your search user route
app.get('/search-user', async (req, res) => {
  try {
    const searchQuery = req.query.query; // Assuming you pass the search query as a query parameter

    // Use Cognito SDK to search for users (this is just an example)
    const searchParams = {
      UserPoolId: 'us-east-1_E0JSrZ9BL',
      Filter: `name = "${searchQuery}"` // Modify the filter according to your needs
    };

    const searchResults = await cognito.listUsers(searchParams).promise();

    // Process and return search results
    res.json(searchResults.Users);
  } catch (error) {
    console.error('Error searching for user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
