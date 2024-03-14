import { Appbar } from 'react-native-paper';
export default function HeaderNavigationBar({ route, options }) {

  return (
    <Appbar.Header theme={{ colors: { primary: 'green' } }}>
      <Appbar.Content title="News Wave" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
}