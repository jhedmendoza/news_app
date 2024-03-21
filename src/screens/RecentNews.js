import  {React, useState, useEffect, useReducer }  from 'react';
import {StyleSheet, View, ScrollView, Linking} from 'react-native';
import {Card, Text, ActivityIndicator  } from 'react-native-paper';
import axios from 'axios';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const RecentNewsScreen = () =>{

    const defaultBannerImage = 'https://placehold.jp/30/eeeeee/cccccc/300x150.png?text=No+Image'
    const API_KEY = '10f83bbe18b14c5c86721e2a5a9c9579'
    const API_URL = 'https://newsapi.org/v2/top-headlines'
    const countryCode =  storage.contains('user.countryCode') ? storage.getString('user.countryCode') : 'us'

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [loadMore, setLoadMore] = useState(false);

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    }

    const getNewsData = async () => {
        axios.get(API_URL, {
          params: {
           apiKey: API_KEY,
            country: countryCode,
            page: page,
            pageSize: 10
          }
        })
        .then(function (response) {
            if (response.data.status == 'ok') {

                console.log(response.data)
                console.log(response.data.articles.length)

                if (response.data.articles.length > 0) {

                    setLoadMore(true)

                    if (page > 1) {
                        let data = [...news, ...response.data.articles]
                        setNews(data)
                    }
                    else {
                     setNews(response.data.articles);
                    }
                }
                else {
                    setLoadMore(false);
                }

                setLoading(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const loadMoreNewsData = async () => {
        const newPage = page + 1
        setPage(newPage);
        getNewsData(newPage)
    };

    useEffect(() => {
        getNewsData(page);
    }, [page])

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
                loadMoreNewsData()
              }
            }}
          style={{flex:1, backgroundColor: '#EAECED'}}>
              {news.map((item, i) => {
                    const bannerImg = item.urlToImage != null ? item.urlToImage : defaultBannerImage
                    const newsDescription = item.description != null ? item.description : ''
                    return (
                        <Card onPress={() => Linking.openURL(item.url)} style={styles.cards} key={i}>
                            <Card.Cover source={{ uri: bannerImg }} />
                            <Card.Title title={item?.title} subtitle={item?.author} />
                            <Card.Content>
                              <Text variant="bodyMedium">{newsDescription}</Text>
                            </Card.Content>
                        </Card>
                    );
              })}

              {loadMore ? <ActivityIndicator style={styles.preloader} animating={true} /> : null }

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