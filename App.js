import React, { useEffect, useState } from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import {PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home";
import Details from "./components/Details";
import noPerm from './components/noPerm';
import NoMessages from './components/NoMessages';
const Stack = createNativeStackNavigator();


export const DataContext = React.createContext();
export default function App()
{
  const [smsData, setSmsData] = useState([]);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isInit, setIsInt] = useState(true);
  
  
  const getSmsData = () => {
    var filter = {
      box: 'inbox',
    };
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log("Failed with this error: " + fail);
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        setSmsData(arr);
      }
    );
  }
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Please provide SMS permissions",
          message:
            "My Expenses app requires SMS permissions to function ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        setHasPermissions(true);
      } else {
        setHasPermissions(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(()=>{
    if(hasPermissions == false)
    {
      requestCameraPermission();
    }
    
    if(hasPermissions == true && isInit == true)
    {
      getSmsData();
      setIsInt(false);
    }

    
  })
  return(
    <NavigationContainer>
    <DataContext.Provider value={smsData}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={(hasPermissions && smsData.length !=0)?Home:(!hasPermissions)?noPerm:NoMessages} options={{headerShown:false}} />
      <Stack.Screen name="Details" component={Details} options={{headerShown:false}} />
    </Stack.Navigator>
    </DataContext.Provider>
  </NavigationContainer>
  
  );
}


