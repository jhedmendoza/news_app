import  {React, useState, useEffect, useReducer }  from 'react';
import {StyleSheet, View, ScrollView, Linking} from 'react-native';
import {Avatar ,Card, Text, ActivityIndicator, Snackbar  } from 'react-native-paper';
import axios from 'axios';

const RecentNewsScreen = () =>{

    const API_KEY = '10f83bbe18b14c5c86721e2a5a9c9579'
    const API_URL = 'https://newsapi.org/v2/top-headlines/sources'

    const categoryIcons = {
        'business'     : 'office-building-outline',
        'entertainment': 'movie-filter',
        'general'      : 'book',
        'health'       : 'pill',
        'science'      : 'flask',
        'sports'       : 'basketball',
        'technology'   : 'television',
     }

    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(true);

    const getSourcesData = async () => {
        axios.get(API_URL, {
          params: {
           apiKey: API_KEY,
            country: 'us',
          }
        })
        .then(function (response) {
            if (response.data.status == 'ok') {
                if (response.data.sources.length > 0) {
                     setSources(response.data.sources);
                }
                else {
                    setInfo(false)
                }
                setLoading(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    useEffect(() => {
        getSourcesData();
    }, [])

    if (loading) {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
          </View>
        );
    }

    if (!info) {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>No data available</Text>
          </View>
        );
    }

    return (
        <ScrollView
          scrollEventThrottle={16}
          style={{flex:1, backgroundColor: '#EAECED'}}>
              {sources.map((item, i) => {
                    return (
                        <Card style={styles.cards} key={i}>
                            <Card.Title title={item?.name}
                                subtitle={item?.description}
                                left={(props) => <Avatar.Icon {...props} icon={categoryIcons[item.category]} />}
                            />
                        </Card>
                    );
              })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    cards: {
        marginTop:7,
        marginBottom:7
    },
    preloader: {
        marginTop:10,
        marginBottom:10
    }
});

export default RecentNewsScreen;