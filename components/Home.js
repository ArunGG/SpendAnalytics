import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import { VictoryPie , VictoryLegend} from "victory-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';
import {DataContext} from '../App';
MaterialCommunityIcons.loadFont();

export default Home = ( {navigation}) =>{
    const smsData = useContext(DataContext);
    const [totalSpent,setTotalSpent] = useState(0.0);
    const [catData,setCatData] = useState([]);
    const [filteredSms,setFilteredSms] = useState({});
    const [pieData,setPieData] = useState([]);
    const arr = {
        "Food" : [0,{},0],
        "Shopping": [0,{},0],
        "Travel" : [0,{},0],
        "Health" : [0,{},0],
        "Others" : [0,0]
    };
    var totalAmount = 0.0;
    const populateArr = ()=>{
        const tempCat = []; 
        for(let i =0; i<smsData.length;i++)
        {
            var msg_body = smsData[i].body.toLowerCase();
            if(!(msg_body.includes("debited")))
                continue;
            var result = Number(msg_body.match('[0-9]+(\\.[0-9]*)?')[0]);
            totalAmount += result;
             
            if(msg_body.includes("zomato"))
            {
                arr["Food"][0] += 1;
                arr["Food"][2] += result;
                if(!(tempCat.includes("Food")))
                {
                    tempCat.push("Food");
                }
                if("Zomato" in arr["Food"][1])
                {
                    arr["Food"][1]["Zomato"][0] += 1;
                    arr["Food"][1]["Zomato"][1] += result;
                }
                else
                {
                    arr["Food"][1]["Zomato"] = [1,result];
                }
                
            }
            else if(msg_body.includes("swiggy"))
            {
                arr["Food"][0] += 1;
                arr["Food"][2] += result;
                if(!(tempCat.includes("Food")))
                {
                    tempCat.push("Food");
                }
                if("Swiggy" in arr["Food"][1])
                {
                    arr["Food"][1]["Swiggy"][0] += 1;
                    arr["Food"][1]["Swiggy"][1] += result;
                }
                else
                {
                    arr["Food"][1]["Swiggy"] = [1,result];
                }
                
            }
            else if(msg_body.includes("amazon"))
            {
                arr["Shopping"][0] += 1;
                arr["Shopping"][2] += result;
                if(!(tempCat.includes("Shopping")))
                {
                    tempCat.push("Shopping");
                }
                if("Amazon" in arr["Shopping"][1])
                {
                    arr["Shopping"][1]["Amazon"][0] += 1;
                    arr["Shopping"][1]["Amazon"][1] += result;
                }
                else
                {
                    arr["Shopping"][1]["Amazon"] = [1,result]
                }
                
            } 
            else if(msg_body.includes("flipkart"))
            {
                arr["Shopping"][0] += 1;
                arr["Shopping"][2] += result;
                if(!(tempCat.includes("Shopping")))
                {
                    tempCat.push("Shopping");
                }
                if("Flipkart" in arr["Shopping"][1])
                {
                    arr["Shopping"][1]["Flipkart"][0] += 1;
                    arr["Shopping"][1]["Flipkart"][1] += result;
                }
                else
                {
                    arr["Shopping"][1]["Flipkart"] = [1,result]
                }
                
            }
            else if(msg_body.includes("indigo"))
            {
                arr["Travel"][0] += 1;
                arr["Travel"][2] += result;
                if(!(tempCat.includes("Travel")))
                {
                    tempCat.push("Travel");
                }
                if("Indigo" in arr["Travel"][1])
                {
                    arr["Travel"][1]["Indigo"][0] += 1;
                    arr["Travel"][1]["Indigo"][1] += result;
                }
                else
                {
                    arr["Travel"][1]["Indigo"] = [1,result]
                }               
            }
            else if(msg_body.includes("medplus"))
            {
                arr["Health"][0] += 1;
                arr["Health"][2] += result;
                if(!(tempCat.includes("Health")))
                {
                    tempCat.push("Health");
                }
                if("Medplus" in arr["Health"][1])
                {
                    arr["Health"][1]["Medplus"][0] += 1;
                    arr["Health"][1]["Medplus"][1] += result;
                }
                else
                {
                    arr["Health"][1]["Medplus"] = [1,result]
                }               
            }
            else{
                arr["Others"][0] += 1;
                arr["Others"][1] += result; 
                if(!(tempCat.includes("ZOthers")))
                {
                    tempCat.push("ZOthers");
                }             
            }    
        }
        tempCat.sort();
        setCatData([...tempCat]);
        setTotalSpent(totalAmount);
        setFilteredSms(arr); 
        
        // pieChart Data
        var tempPieData = [];
        for(let i =0; i< tempCat.length;i++)
        {
            var catItem = tempCat[i];
            if(catItem == "ZOthers"){
                catItem = "Others";
                var catTotal = arr[catItem][1];
                var catCount = arr[catItem][0];
                var catPercent = ((catTotal/totalAmount)*100).toFixed(2) + "%";
            }
            else{
                var catCount = arr[catItem][0];
                var catTotal = arr[catItem][2];
                var catPercent = ((catTotal/totalAmount)*100).toFixed(2) + "%";
            }


            tempPieData.push({name:catItem, count:catCount, total:catTotal, percent: catPercent});
        }
        setPieData(tempPieData);
    }

    useEffect(()=>{
        if(smsData.length != 0)
            populateArr();
    },[JSON.stringify(smsData)]);

    useEffect(()=>{
    },[totalSpent])
    useEffect(()=>{
    },[JSON.stringify(catData)]);

    const colors = ['#2C363F','#E75A7C','#D6DBD2','#BBC7A4','#6B7FD7'];
    const renderPieChart = ()=>
    {
        return(
            <View style={styles.PiePadding}>
                <VictoryPie 
                 data={pieData}
                 innerRadius={80}
                 x="percent" 
                 y= "total"
                 colorScale={colors}
                radius={125}
                 style={
                     {
                         labels : { fill: '#000', fontFamily:'Roboto-Black'},
                         parent : {
                             elevation:3
                         }
                     }
                 } 
                 ></VictoryPie>
                 <View style={{ position: 'absolute', top:'45.5%', left: '45%'}}>
                     <Text style={{fontFamily:'Roboto-Black' , fontSize:20, color:'#000', textAlign:'center'}}>{pieData.length}</Text>
                     <Text style={{textAlign:'center' , fontFamily:'Roboto-Bold', color:'#474747'}}> Expenses</Text>
                 </View>
            </View>
        )
    }
    const renderCategoryItem = ({item}) =>
    {
        var amount =0;
        var others = false;
        if(item == "Food")
        {
            amount = filteredSms["Food"][0];
        }
        if(item == "Shopping")
        {
            amount = filteredSms["Shopping"][0];
        }
        if(item == "Travel")
        {
            amount = filteredSms["Travel"][0];
        }
        if(item == "Health")
        {
            amount = filteredSms["Health"][0];
        }
        if(item == "ZOthers")
        {
            others = true;
            item = "Others";
            amount = filteredSms["Others"][0];
        }
        return(
            <View style={styles.categoryItemWrapper}>
                <TouchableOpacity key={item} onPress={()=> navigation.navigate('Details', {
                    item : [filteredSms[item] , item]
                })}>

                <Text style={styles.catergoryItemTextWrapper}>{(others?"Others":item) + " : " + amount}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {/*Header*/}
            <SafeAreaView>
            <View style={styles.headerWrapper}>
            <Text style={styles.title}>My Expenses</Text>    
            </View>
            </SafeAreaView>

            {/*Summary*/}
            <View>
            </View>
            <View style={styles.SummaryWrapper}> 
            <Text style={styles.SummaryText}>Summary</Text>
            <View style={styles.SummaryUnderLine}></View>
            <View style={styles.totalSpentContainer}>
                <Text style={styles.totalSpentContainer}>Total Spent: {totalSpent.toFixed(2)} INR</Text>
                <Text style={styles.totalSpentContainer}></Text>
            </View>
            </View>
            
            {/*Categories*/}
            <View style={styles.SummaryWrapper}> 
            <Text style={styles.SummaryText}>Categories</Text>
            </View>
            <View style={styles.categoriesContainer}>
                <View style={styles.categoriesListWrapper}>

                    <FlatList
                        data={catData}
                        renderItem={renderCategoryItem}
                        keyExtractor={item => item}
                        numColumns={2}   
                    />
                </View>
            </View>

            {/*Analytics*/}

            <View style={styles.SummaryWrapper}> 
            <Text style={styles.SummaryText2}>Analytics</Text>
            </View>
            <View style={styles.AnalyticsWrapper}>
            <View style={styles.reSize}>
                <VictoryLegend x={10} y={10}
                orientation="horizontal"
                gutter={15}
                data={pieData}
                colorScale={colors}
                />   
            </View >
            {
            (pieData.length==0)?console.log("Zero"):renderPieChart()
            } 
            </View>
              
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex:1,
    backgroundColor:'#FFFFFF',
},
reSize:{
height:0,
justifyContent:'center'

},
PiePadding:{
    paddingTop:15
}
,
headerWrapper: {
    flexDirection: "row",   
    justifyContent:'center',
    alignItems:'center',
    paddingTop:15,
    paddingBottom:8
    
},
title:{ 
fontFamily:'Roboto-Medium',
fontSize:24,
color:colors.black,
},

SummaryWrapper:{
    paddingHorizontal:30,
},
SummaryText:{
    fontFamily:'Roboto-Medium',
    fontSize:20,
    color:colors.black,
    paddingBottom:8,
},
SummaryText2:{
    fontFamily:'Roboto-Medium',
    fontSize:20,
    color:colors.black,
    paddingTop:5,
    paddingBottom:8,
},
SummaryUnderLine:{
    borderTopColor:'#D2D2D2',
    borderTopWidth:2,
},
totalSpentContainer:{
    paddingVertical:6,
    flexDirection: "row",   
    justifyContent:'space-between',
    fontFamily:'Roboto-Black',
    fontSize:15,
    color:'#000'
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

    alignSelf:'center',
    textAlign:'center',
    fontFamily:'Roboto-Medium',
    color:'#000'
},

AnalyticsWrapper:{
    backgroundColor:'#F8F8F8',
    borderRadius:8,
    paddingRight:30 
},
PieChartWrapper:{
    
}
});