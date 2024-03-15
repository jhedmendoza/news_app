import { Appbar } from 'react-native-paper';
export default function HeaderNavigationBar({ route, options }) {

  return (
    <Appbar.Header style={{backgroundColor: '#f3edf6'}}>
      <Appbar.Content title="News Wave" />
      <Appbar.Action icon="web" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
}