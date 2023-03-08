import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Card from './card';
import * as Location from "expo-location";
import moment from "moment"

const apiKey = 'a317bce8821623b6cedf7b7b74595d89'

const ScrollViewCard = () => {
    const [weathers, setWeathers] = useState([])
    const [location, setLocation] = useState(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => setWeathers(data.list))
        })();
      }, [])

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                {
                    weathers.map((weather) => {
                        return <Card
                            temperature={weather && weather.main.temp}
                            weather={weather && weather.weather[0].main}
                            icon={weather && weather.weather[0].icon}
                            time={moment(weather.dt_txt).format('d MMMM, h')}
                        />
                    })
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: 250
  },
});

export default ScrollViewCard;