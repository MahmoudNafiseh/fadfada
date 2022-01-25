import React from 'react';
import { StyleSheet } from 'react-native';
import { Heading, View, Text, Flex, HStack, Box } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { G, Circle } from 'react-native-svg';

const PieChart = () => {
   const radius = 70;
   const circleCircumference = 2 * Math.PI * radius;

   const groceries = 3;
   const bills = 27;
   const total = groceries + bills;

   const groceriesPercentage = (groceries / total) * 100;
   const billsPercentage = (bills / total) * 100;
   //    const regularPercentage = (regular / total) * 100;

   const groceriesStrokeDashoffset =
      circleCircumference - (circleCircumference * groceriesPercentage) / 100;
   const billsStrokeDashoffset =
      circleCircumference - (circleCircumference * billsPercentage) / 100;
   //    const regularStrokeDashoffset =
   //       circleCircumference - (circleCircumference * regularPercentage) / 100;

   const groceriesAngle = (groceries / total) * 360;
   const billsAngle = (bills / total) * 360;
   //    const regularAngle = groceriesAngle + billsAngle;

   return (
      <View style={styles.container}>
         <View style={styles.graphWrapper}>
            <Svg height='260' width='260' viewBox='0 0 180 180'>
               <G rotation={-90} originX='90' originY='90'>
                  {total === 0 ? (
                     <Circle
                        cx='50%'
                        cy='50%'
                        r={radius}
                        stroke='#FF7900'
                        fill='transparent'
                        strokeWidth='30'
                     />
                  ) : (
                     <>
                        <Circle
                           cx='50%'
                           cy='50%'
                           r={radius}
                           stroke='transparent'
                           fill='transparent'
                           strokeWidth='30'
                           strokeDasharray={circleCircumference}
                           strokeDashoffset={groceriesStrokeDashoffset}
                           rotation={0}
                           originX='90'
                           originY='90'
                           strokeLinecap='round'
                        />
                        <Circle
                           cx='50%'
                           cy='50%'
                           r={radius}
                           stroke='#FF7900'
                           fill='transparent'
                           strokeWidth='30'
                           strokeDasharray={circleCircumference}
                           strokeDashoffset={billsStrokeDashoffset}
                           rotation={groceriesAngle}
                           originX='90'
                           originY='90'
                           strokeLinecap='round'
                        />
                     </>
                  )}
               </G>
            </Svg>
            <Text
               fontSize={24}
               fontWeight={700}
               color='white'
               position={'absolute'}
            >
               {(1 - groceries / total) * 100}%
            </Text>
         </View>
      </View>
   );
};

export default PieChart;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   graphWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   label: {
      position: 'absolute',
      textAlign: 'center',
      fontWeight: '700',
   },
});
