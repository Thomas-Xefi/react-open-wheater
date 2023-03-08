import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Card = ({ temperature, weather, icon, time }) => {


  return (
    <View style={styles.card}>
      <Text>
        {time && `${time}h`}
      </Text>
      <Text style={styles.title}>
        {temperature ? `${parseInt(temperature)}°C` : '°C'}
      </Text>
      <View style={styles.content}>
        <Image
            style={styles.img}
            source={{uri: `https://openweathermap.org/img/wn/${icon}.png`}}
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
    width: 130,
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
  img: {
    height: 50,
    width: 50
  }
});

export default Card;