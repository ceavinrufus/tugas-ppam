import { Text, View, Image } from "react-native";
import React from "react";
import { AdjustmentsHorizontalIcon, CheckBadgeIcon, ClockIcon } from 'react-native-heroicons/outline'

const RankingCard =({ rank, names, badges, sessions, image}) => {
    return (
        <View className='flex flex-row mb-2 justify-start rounded-xl border border-secondary bg-white overflow-hidden'>
          <View className='flex items-center justify-items-center px-4 py-8 bg-secondary'>
            <Text className='text-md font-bold'>{rank}</Text>
          </View>
          <View className='w-20 overflow-hidden bg-grey'>
            <Image className='w-full h-20' source={{uri: image}}></Image>
          </View>
          <View className='flex flex-col justify-center pl-3'>
            <View>
              <Text className='text-sm font-bold'>{names}</Text>
              <View className='flex flex-row items-center'>
                <CheckBadgeIcon color="black" size={13}/>
                <Text className='text-xs'>{badges} badges</Text>
              </View>
              <View className='flex flex-row items-center'>
                <ClockIcon color="black" size={13}/>
                <Text className='text-xs'>{sessions} sessions</Text>
              </View>
            </View>
          </View>
        </View>
    );
};

export default RankingCard;