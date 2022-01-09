import React from 'react';

import { Text, View } from 'react-native';

export default noPerm = () =>{
    return(<View>
        <Text style={{fontFamily:'Roboto-Thin' , fontSize:5, color:'#000', textAlign:'center'}} > No Messages found</Text>
    </View>);
}