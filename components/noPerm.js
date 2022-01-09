import React from 'react';

import {Text, View} from 'react-native';

export default noPerm = () =>{
    return(<View>
        <Text style={{fontFamily:'Roboto-Black' , fontSize:20, color:'#000', textAlign:'center'}}> Please provide permission to use this app</Text>
    </View>);
}