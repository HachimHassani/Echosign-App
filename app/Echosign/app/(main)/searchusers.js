// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Auth, API } from 'aws-amplify';    
import { useUser } from '../../context/auth';

const UserSearchScreen = () => {
    async function postData(query) {
        const apiName = 'echosignapi';
        const path = '/user-search';
        const myInit = {
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`
          }
        };
        
        API.get(apiName, path+'?query='+query, myInit)
        .then((response) => {
          console.log('success 1', response);
          setUsers(response.users);
          return response;
        })
        .catch((error) => {
          console.log('error', error);
          console.log(myInit);
        });
        }
        
        
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const res =  postData(searchQuery);
      console.log('success', res);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const renderUserCard = ({ item }) => (
    <View style={styles.userCard}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      {/* Add more user info as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={users}
        keyExtractor={item => item.username.toString()}
        renderItem={renderUserCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default UserSearchScreen;
