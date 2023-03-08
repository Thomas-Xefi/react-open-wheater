import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Card = ({ temperature, weather, icon, time }) => {
  return (
    <View style={styles.card}>
      <Text>
        {time}
      </Text>
      <Text style={styles.title}>
        {temperature ? `${parseInt(temperature)}°C` : '°C'}
      </Text>
      <View style={styles.content}>
        <Image
            source={{uri: `http://openweathermap.org/img/w/${icon}.png`}}
            size={50}
        />
        <Text style={styles.weather}>
            {weather} 
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  weather: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
});

export default Card;