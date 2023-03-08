import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Card from './components/card';
import VerticalScrollView from './components/VerticalScrollView';
import moment from "moment";

const apiKey = 'a317bce8821623b6cedf7b7b74595d89'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => setWeather(data))
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`Bienvenue à ${weather ? weather.name : ''}`}
      </Text>
      <Card
        temperature={`${weather ? weather.main.temp : ''}°C`}
        weather={weather && weather.weather[0].main}
        icon={weather && weather.weather[0].icon}
        date={ weather && {day: moment(weather.dt_txt).format('dddd d MMMM'), hour: moment(weather.dt_txt).format('LT')} }
      />
      <VerticalScrollView location={location} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35363a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32
  },
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
