/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	AUTH_ECHOSIGN_USERPOOLID
	ENV
	REGION
	STORAGE_DYNANOFRIENDS_ARN
	STORAGE_DYNANOFRIENDS_NAME
	STORAGE_DYNANOFRIENDS_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const {CognitoIdentityProviderClient, ListUsersCommand} = require('@aws-sdk/client-cognito-identity-provider'); // Import the AWS SDK
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
// Configure AWS Cognito
const cognito = new CognitoIdentityProviderClient({
  region: process.env.REGION, // Use the region from your Amplify Params
});


const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "USER";
const partitionKeyType = "S";
const sortKeyName = "FRIEND";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/users";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});
// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

// Function to generate a chat ID based on user IDs
function generateChatId(user1Id, user2Id) {
  return `${user1Id}-${user2Id}`;
}

/**********************
 * Example get method *
 **********************/

app.get('/users/search',async function(req, res) {
  // Add your code here
  try {
    const query = req.query.query;
    // Search for the user by username in your Cognito user pool
    const params = {
      UserPoolId: process.env.AUTH_ECHOSIGN_USERPOOLID, // Use your Cognito User Pool ID
      Filter: `name = "${query}"`, // Search by username
    };
    const command = new ListUsersCommand(params);
    const result = await cognito.send(command);

    if (result.Users.length === 0) {
      res.status(404).json({ error: 'User not found', query: req.url, body: req.body, query: req.params.query });

    } else {
      const simplifiedUserList = result.Users.map( user => ({
        username: user.Username,
        sub: user.Username,
        email_verified: user.Attributes.find(attr => attr.Name === 'email_verified').Value,
        name: user.Attributes.find(attr => attr.Name === 'name').Value,
        nickname: user.Attributes.find(attr => attr.Name === 'nickname').Value,
        email: user.Attributes.find(attr => attr.Name === 'email').Value,
        UserCreateDate: user.UserCreateDate,
        UserLastModifiedDate: user.UserLastModifiedDate,
        Enabled: user.Enabled,
        UserStatus: user.UserStatus
    }));
      res.json({ success: 'User found', users: simplifiedUserList});
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});
 

app.get('/users/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/user-search', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/user-search/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/user-search', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/user-search/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});


/***********************
 * Friend Request APIs *
 ***********************/

// Create a friend request
app.post('/users/request', async function(req, res) {
  try {
    
    const { sender, receiver } = req.body;
    // Save the friend request to DynamoDB
    const params = {
      TableName: process.env.STORAGE_DYNANOFRIENDS_NAME, // Use your DynamoDB table name
      Item: {
        USER : `${sender}`,
        FRIEND : `${receiver}`,
        Status: 'pending'
      },
    };
    await ddbDocClient.send(new PutCommand(params));
    res.json({ success: 'Friend request sent successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Accept a friend request
app.post(path + '/accept' +hashKeyPath+ sortKeyPath, async function(req, res) {
  const userId = req.params[partitionKeyName]; // Replace with your attribute name for user
  const friendId = req.params[sortKeyName]; // Replace with your attribute name for friend
  const newState = 'accepted'; 

  // Generate the chat ID based on user IDs
  const chatId = generateChatId(userId, friendId);

  const updateParams = {
    TableName: process.env.STORAGE_DYNANOFRIENDS_NAME,
    Key: {
      [partitionKeyName]: userId,
      [sortKeyName]: friendId,
    },
    UpdateExpression: 'SET #stateAttr = :newState, #chatIdAttr = :chatId',
    ExpressionAttributeNames: {
      '#stateAttr': 'Status', // Replace 'state' with your attribute name
      '#chatIdAttr': 'chat_id',
    },
    ExpressionAttributeValues: {
      ':newState': newState,
      ':chatId': chatId,
    } };

  try {
    await ddbDocClient.send(new UpdateCommand(updateParams));
    res.json({ message: 'Friend request accepted successfully.' });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not accept friend request: ' + err.message });
  }
});

//list friend requests
app.get(path + '/request'+ hashKeyPath, async function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  condition['Status'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: ['pending']
  };

  let queryParams = {
    TableName: process.env.STORAGE_DYNANOFRIENDS_NAME,
    IndexName: 'USER-Status-index',
    KeyConditions: condition
  }
  console.log(queryParams);
  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});

//list friend requests
app.get(path + '/r-request'+ sortKeyPath, async function(req, res) {
  const condition = {}
  condition[sortKeyName] = {
    ComparisonOperator: 'EQ'
  }
  condition['Status'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: ['pending']
  };

  if (userIdPresent && req.apiGateway) {
    condition[sortKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[sortKeyName]['AttributeValueList'] = [ convertUrlType(req.params[sortKeyName], sortKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: process.env.STORAGE_DYNANOFRIENDS_NAME,
    IndexName: 'friend_index', // Replace with your GSI name
    KeyConditionExpression: `${sortKeyName} = :value`,
    
    FilterExpression: '#s = :Status',
    ExpressionAttributeNames: {
      '#s': 'Status'
    },
    ExpressionAttributeValues: {
      ':Status': 'pending',
      ':value': condition[sortKeyName]['AttributeValueList'][0]
    }
  }

  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});


//list friends
app.get(path + '/friends'+ hashKeyPath, async function(req, res) {
   const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  condition['Status'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: ['pending']
  };

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: process.env.STORAGE_DYNANOFRIENDS_NAME,
    IndexName: 'USER-Status-index',
    KeyConditions: condition
  }

  const condition2 = {}
  condition2[sortKeyName] = {
    ComparisonOperator: 'EQ'
  }
  condition2['Status'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: ['accepted']
  };

  if (userIdPresent && req.apiGateway) {
    condition2[sortKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition2[sortKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], sortKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

   let queryParams2 = {
    TableName: process.env.STORAGE_DYNANOFRIENDS_NAME,
    IndexName: 'FRIEND-Status-index', // Replace with your GSI name
    KeyConditions: condition2
    // KeyConditionExpression: `${sortKeyName} = :value`,
    
    // FilterExpression: '#s = :state',
    // ExpressionAttributeNames: {
    //   '#s': 'Status'
    // },
    // ExpressionAttributeValues: {
    //   ':state': 'accepted',
    //   ':value': condition[sortKeyName]['AttributeValueList'][0]
    // }
  }
  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    const data2 = await ddbDocClient.send(new QueryCommand(queryParams2));
    res.json(data.Items.concat(data2.Items));
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }

});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

