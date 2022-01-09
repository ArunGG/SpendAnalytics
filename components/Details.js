import React from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { VictoryAxis, VictoryBar, VictoryChart} from "victory-native";


export default Details = ({route, navigation}) =>{


    const { item } = route.params;
    const finalItems = [];
    const getItems = ()=>{

        if(item[1] === "Others")
        {

            finalItems.push({x:item[1],y:item[0][1], label:item[0][0]});
        }
        else
        {
            for (let i in item[0][1])
            {
                finalItems.push({x:i,y:item[0][1][i][1], label:item[0][1][i][0]});
            }
        }
    }
    
    const renderCategoryItem = ({item : items}) => {
        var totalAmount = 0.0;
        if(items !== "Others")
        {
            totalAmount = item[0][1][items][1];
        }

        else
        {
            totalAmount = item[0][1];
        }

        return(
            <View >

                <Text style={styles.catergoryItemTextWrapper}>{ "+ " + items+ " : " + totalAmount.toFixed(2) + " INR"}</Text>

            </View>
        );
    }
    return(
    <View style = {styles.container}>
        {/*Header*/}
        <SafeAreaView>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <View style={styles.headerWrapper}>
            
            <View style ={styles.headerBack}>
            <Entypo name='chevron-with-circle-left' size={30} color={"#4E4E4E"}></Entypo>
            </View>  
        </View>
        </TouchableOpacity>
        </SafeAreaView>

        {/*Summary*/}
        <View style={styles.SummaryWrapper}> 
        <Text style={styles.SummaryText}>Category : </Text>
        <View > 
        <Text style={styles.SummaryUnderLine}>{item[1]}</Text>
        </View>
        </View>
        <View style={styles.barGraphContainer}>

            <VictoryChart 

            domainPadding={{x:100}}
            animate={{
                duration: 500,
                onLoad: { duration: 500 }
            }} 

            >
                {getItems()}
                <VictoryAxis label="From"
                
                style={
                    {
                        axisLabel: {
                            padding:35,
                        }
                    }
                }></VictoryAxis>
                <VictoryAxis dependentAxis label="Amount Spent"
                
                style={
                    {
                        axisLabel: {
                            padding:-26,
                        }
                    }
                }
                ></VictoryAxis>
                <VictoryBar
                
                data={finalItems}
                x="x"
                y='y'
                barWidth={26}
                alignment='middle'
                // width={width / 1.1}
                >


                </VictoryBar>
            </VictoryChart>
        </View>
        <View style={styles.SummaryWrapper2}> 
            <Text style={styles.SummaryText3}>Summary</Text>
            <View style={styles.SummaryUnderLineNew}></View>
            <View style={styles.totalSpentContainer}>
                <Text style={styles.totalSpentContainer}>Total money spent on {item[1]}: { (item[1] == "Others")? item[0][1].toFixed(2) : item[0][2].toFixed(2)} INR</Text>
            </View>
            <FlatList
                        data={(item[1] == "Others")?["Others"]:Object.keys(item[0][1])}
                        renderItem={renderCategoryItem}
                        keyExtractor={item => item}  
                    />
            </View>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    SummaryWrapper2:{
        paddingHorizontal:30,
        
    },
    SummaryUnderLineNew:{
        borderTopColor:'#D2D2D2',
        borderTopWidth:2,
    },
    barGraphContainer:{
        marginHorizontal:10,
        paddingLeft: 10,
        backgroundColor:'#EBEBEB',
        height:310,
        borderRadius:6
    },
    headerBack:{
        marginHorizontal:20,
        width:50,
        height:50,
        backgroundColor:"#EAEAEA",
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        elevation:3
    },
    headerWrapper: {
        flexDirection: "row",   
        paddingVertical:35,
        
    },
    title:{ 
    fontFamily:'Roboto-Medium',
    fontSize:24,
    color:colors.black,
    },
    
    SummaryWrapper:{
        paddingHorizontal:30,
        flexDirection:'row',
    },
    SummaryText:{
        fontFamily:'Roboto-Medium',
        fontSize:30,
        color:colors.black,

        paddingBottom:8,
    },
    SummaryText3:{
        fontFamily:'Roboto-Medium',
        fontSize:30,
        paddingTop: 20,
        color:colors.black,

        paddingBottom:8,
    },
    SummaryUnderLine:{
        color:'#000',
        paddingTop: 4,
        fontSize:30
    },
    totalSpentContainer:{
        paddingVertical:6,
        flexDirection: "row",   
        justifyContent:'space-between',
        fontFamily:'Roboto-Bold',
        fontSize:15,
        color:'#474747'
    },
    
    categoriesContainer:{
    
        backgroundColor:'#F8F8F8',
        borderRadius:8,
        marginHorizontal:20,
        height:140,
    
        
    },
    
    categoryItemWrapper:{
        marginVertical:15,
        marginHorizontal:20,
        backgroundColor:"#FFF",
        borderRadius:8,
    
        width:140,
        justifyContent:'center',
        alignSelf:'center',
        height:40,
        elevation:3
    
        
    },
    
    categoriesListWrapper:{
        shadowOffset:{ width:2,height:2},
        shadowOpacity:0.25,
        shadowRadius:3.5,
        shadowColor:'#000',
        elevation:3
    },
    
    catergoryItemTextWrapper:{
    
        fontFamily:'Roboto-Bold',
        fontSize:16,
        color:'#474747',
        paddingVertical:5
    },
    
    AnalyticsWrapper:{
        backgroundColor:'#F8F8F8',
        borderRadius:8,
        paddingRight:30 
    },
    });