// In App.js in a new project

import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  Alert,
  Platform,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  const data = Array(30)
    .fill(null)
    .map((_, idx) => `Item ${idx + 1}`);

  const renderItem = ({ item }) => (
    <View
      style={{ height: 50, paddingHorizontal: 20, justifyContent: 'center' }}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => Alert.alert('This is a button!')}
              title="Info"
              color={Platform.select({
                ios: '#fff',
                android: 'transparent',
                web: 'transparent',
              })}
              style={{
                elevation: 0,
              }}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5781ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              const iconSource = focused
                ? require('./assets/information-circle.png')
                : require('./assets/information-circle-outline.png');
              return (
                <Image
                  source={iconSource}
                  style={{
                    height: size,
                    width: size,
                    tintColor: color,
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              const iconSource = focused
                ? require('./assets/list-circle.png')
                : require('./assets/list-circle-outline.png');
              return (
                <Image
                  source={iconSource}
                  style={{
                    height: size,
                    width: size,
                    tintColor: color,
                  }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
