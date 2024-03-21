import  {useState}  from 'react';
import {View} from 'react-native';
import { Appbar } from 'react-native-paper';
import {CountryPicker} from "react-native-country-codes-picker";
import { MMKV } from 'react-native-mmkv'
import {useNavigation } from '@react-navigation/native';
import RecentNewsScreen from '../screens/RecentNews.js';


export const storage = new MMKV()

export default function HeaderNavigationBar({ route, options }) {

 const [showCountry, setShowCountry] = useState(false);
 const navigation = useNavigation();

  return (
    <Appbar.Header style={{backgroundColor: '#f3edf6'}}>
      <Appbar.Content title="News Wave" />
      <Appbar.Action icon="web" onPress={() => { setShowCountry(true) }} />
        <View>
        <CountryPicker
          show={showCountry}
          pickerButtonOnPress={(item) => {
            storage.set('user.countryCode', item.code)
            setShowCountry(false);
          }}
          showOnly={['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca',
                     'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr',
                     'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in',
                     'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my',
                     'ng', 'nl', 'no', 'nz', 'ph', 'pt', 'ro', 'rs',
                     'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr',
                     'tw', 'ua', 'us', 've', 'za'
          ]}

        />
        </View>
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>


  );
}