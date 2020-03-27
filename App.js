import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
export default function App() {
  const [notificationStatus, setStatus] = useState(false);
  const ask = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log('status', status);
    setStatus(status);
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('token', token);
    window.fetch('http://192.168.43.81:3002/user/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    // Notifications.setBadgeNumberAsync(0);
  };

  const test = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('token', token);
  };
  useEffect(() => {
    ask();
  }, []);
  const post = () => {
    console.log('post');
    fetch('http://192.168.43.81:3002/message', {
      method: 'POST'
    });
  };
  return (
    <View style={styles.container}>
      {notificationStatus ? (
        <TouchableOpacity onPress={post}>
          <Text>Open up App.js to start working on your app!</Text>
        </TouchableOpacity>
      ) : (
        <Text>loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
