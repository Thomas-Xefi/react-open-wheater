import React, { useContext, useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Card from './card';
import * as Location from "expo-location";
import moment from "moment"

const apiKey = 'a317bce8821623b6cedf7b7b74595d89'

const HorizonTalScrollView = ({weathers, day}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.subTitle}>
                {day}
            </Text>
            <ScrollView horizontal={true}>
                {
                    weathers.map((weather, index) => {
                        return index < 5 && <Card
                            key={index}
                            temperature={weather.temperature}
                            weather={weather.weather}
                            icon={weather.icon}
                            date={weather.date}
                        />
                    })
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    subTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
});

export default HorizonTalScrollView;