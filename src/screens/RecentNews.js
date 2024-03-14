import  {React, useState, useEffect}  from 'react';
import {StyleSheet, View, ScrollView, Animated} from 'react-native';
import {Card, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

import Header from '../components/Header.js';

const RecentNewsScreen = () =>{

    const apiKey = '10f83bbe18b14c5c86721e2a5a9c9579'
    const apiUrl = 'https://newsapi.org/v2/top-headlines'

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    }

    useEffect(() => {

        const getTopHeadlines = async () => {
            axios.get(apiUrl, {
              params: {
                country: 'us',
                apiKey: apiKey
              }
            })
            .then(function (response) {
                if (response.data.status == 'ok') {
                    setNews(response.data.articles);
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getTopHeadlines();

    }, [])

      if (loading) {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
          </View>
        );
      }

    return (
        <ScrollView
          scrollEventThrottle={16}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                console.log('bottom')
              }
            }}
          style={{flex:1}}>
              {news.map((item, i) => {
                    const bannerImg = item.urlToImage != null ? item.urlToImage : 'https://placehold.jp/30/dd6699/ffffff/300x150.png?text=banner+image'
                    const newsDescription = item.description != null ? item.description : ''
                    return (
                        <Card style={styles.cards} key={i}>
                            <Card.Cover source={{ uri: bannerImg }} />
                            <Card.Title title={item?.title} subtitle={item?.author} />
                            <Card.Content>
                              <Text variant="bodyMedium">{newsDescription}</Text>
                            </Card.Content>
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
        marginTop:15
    }
});

export default RecentNewsScreen;