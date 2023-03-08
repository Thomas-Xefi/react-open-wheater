import React, { useContext, useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Card from './card';
import * as Location from "expo-location";
import moment from "moment"
import HorizonTalScrollView from "./HorizontalScrollView";

const apiKey = 'a317bce8821623b6cedf7b7b74595d89'

const VerticalScrollView = () => {
    const [weathers, setWeathers] = useState([])
    const [location, setLocation] = useState(null)
    const weathersMap = new Map()

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

    const weatherList = weathers.map((weather) => {
        return {
            date: moment(weather.dt_txt).format('dddd'),
            data: {
                temperature: weather.main.temp,
                weather: weather.weather[0].main,
                icon: weather.weather[0].icon,
                date: {
                    day: moment(weather.dt_txt).format('dddd Do MMMM'),
                    hour: moment(weather.dt_txt).format('LT'),
                },
            }
        }
    })

    weatherList.forEach((weather) => {
        if (weathersMap.has(weather.date)) {
            weathersMap.get(weather.date).push(weather.data)
        }
        else {
            weathersMap.set(weather.date, [weather.data]);
        }
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    [...weathersMap.entries()].map(([key, value]) => (
                        <HorizonTalScrollView key={key} weathers={value} day={key} />
                    ))
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
        marginTop: 20
    },
});

export default VerticalScrollView;