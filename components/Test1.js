// import * as React from 'react';
// import { LineChart, PieChart } from 'react-native-chart-kit';
// import { Box, Text, View } from 'native-base';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Dimensions } from 'react-native';
// const Test1 = (temps) => {
//    const data = [
//       {
//          name: 'Progress',
//          population: 27,
//          color: '#FF7900',
//          legendFontColor: '#7F7F7F',
//          legendFontSize: 15,
//          label: 'yo ',
//       },
//       {
//          name: 'New York',
//          population: 3,
//          color: '#ffffff',
//          legendFontColor: '#7F7F7F',
//          legendFontSize: 15,
//          legend: 'yo',
//       },
//    ];
//    return (
//       <SafeAreaView height={'100%'}>
//          <Text>Bezier Line Chart</Text>
//          {/* <LineChart
//             data={{
//                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//                datasets: [
//                   {
//                      data: [
//                         Math.random() * 100,
//                         Math.random() * 100,
//                         Math.random() * 100,
//                         Math.random() * 100,
//                         Math.random() * 100,
//                         Math.random() * 100,
//                      ],
//                   },
//                ],
//             }}
//             width={Dimensions.get('window').width} // from react-native
//             height={220}
//             yAxisLabel='$'
//             yAxisSuffix='k'
//             yAxisInterval={1} // optional, defaults to 1
//             chartConfig={{
//                backgroundColor: '#e26a00',
//                backgroundGradientFrom: '#fb8c00',
//                backgroundGradientTo: '#ffa726',
//                decimalPlaces: 2, // optional, defaults to 2dp
//                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                style: {
//                   borderRadius: 16,
//                },
//                propsForDots: {
//                   r: '6',
//                   strokeWidth: '2',
//                   stroke: '#ffa726',
//                },
//             }}
//             bezier
//             style={{
//                marginVertical: 8,
//                borderRadius: 16,
//             }}
//          /> */}
//          <Box>
//             <PieChart
//                data={data}
//                width={Dimensions.get('window').width}
//                height={300}
//                chartConfig={{
//                   backgroundColor: '#e26a00',
//                   backgroundGradientFrom: '#fb8c00',
//                   backgroundGradientTo: '#ffa726',
//                   decimalPlaces: 2, // optional, defaults to 2dp
//                   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                   style: {
//                      borderRadius: 16,
//                   },
//                   propsForDots: {
//                      r: '6',
//                      strokeWidth: '2',
//                      stroke: '#ffa726',
//                   },
//                }}
//                accessor={'population'}
//                backgroundColor={'transparent'}
//                paddingLeft={'15'}
//                center={[Dimensions.get('window').width / 5, 10]}
//                hasLegend={false}
//                absolute
//                showValuesOnTopOfBars
//             />
//          </Box>
//       </SafeAreaView>
//    );
// };
// export default Test1;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Heading, View, Text, Box, HStack, Flex } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { G, Circle } from 'react-native-svg';
import PieChart from './PieChart';
const Test1 = () => {
   const groceries = 3;
   const bills = 27;
   const total = groceries + bills;

   return (
      <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
         <HStack p={4}>
            <Heading color='white'>
               You are {100 - (1 - groceries / total) * 100}% away from your
               goal. Keep it up!
            </Heading>
         </HStack>

         <Box h='60%'>
            <PieChart />
         </Box>
      </SafeAreaView>
   );
};

export default Test1;
