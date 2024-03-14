import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import RecentNewsScreen from '../screens/RecentNews.js';

const RecentNewsRoute = () => <RecentNewsScreen />;
const FavouritesRoute = () => <Text>Albums</Text>;
const SourcesRoute = () => <Text>Recents</Text>;

const FooterComponent = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'recent_news', title: 'Recent News', focusedIcon: 'newspaper' },
    { key: 'sources', title: 'Sources', focusedIcon: 'history' },
    { key: 'favorites', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},

  ]);

  const renderScene = BottomNavigation.SceneMap({
    recent_news: RecentNewsRoute,
    sources: SourcesRoute,
    favorites: FavouritesRoute,

  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default FooterComponent;