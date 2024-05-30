import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { AdjustmentsHorizontalIcon, CheckBadgeIcon, ClockIcon } from 'react-native-heroicons/outline'
import RankingCard from "../../components/RankingCard";
// import {  } from 'react-native-heroicons/micro'
import { LinearGradient } from "expo-linear-gradient";

const Leaderboard = () => {

  const data = [{
    rank: 2,
    names: "Chanyeol",
    badges: 150,
    sessions: 5000,
    image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZG5YcjJHrCeypFrC0wmB5yZQAgy5uOdzgwWR3cKMZqV-KZx5yMKl_6Nc9X40e-SBy-dKrI8QQQtQyCxIdSc7TamkNU3eJlNQs=s2560'
  },
  {
    rank: 3,
    names: "Chanyeol",
    badges: 135,
    sessions: 4677,
    image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZG5YcjJHrCeypFrC0wmB5yZQAgy5uOdzgwWR3cKMZqV-KZx5yMKl_6Nc9X40e-SBy-dKrI8QQQtQyCxIdSc7TamkNU3eJlNQs=s2560'
  },
  {
    rank: 4,
    names: "Chanyeol",
    badges: 130,
    sessions: 4599,
    image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZG5YcjJHrCeypFrC0wmB5yZQAgy5uOdzgwWR3cKMZqV-KZx5yMKl_6Nc9X40e-SBy-dKrI8QQQtQyCxIdSc7TamkNU3eJlNQs=s2560'
  },
  {
    rank: 5,
    names: "Chanyeol",
    badges: 128,
    sessions: 4500,
    image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZG5YcjJHrCeypFrC0wmB5yZQAgy5uOdzgwWR3cKMZqV-KZx5yMKl_6Nc9X40e-SBy-dKrI8QQQtQyCxIdSc7TamkNU3eJlNQs=s2560'
  }
  ]

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/*Header*/}
          <View className='flex flex-row justify-between pt-12 pb-4 px-6 bg-secondary'>
            <Text className='text-lg font-bold'>Global Leaderboard</Text>
            <View className='p-2 bg-gray-100 rounded-md'>
              <AdjustmentsHorizontalIcon color="black" size={18}/>
            </View>
          </View>
          <View className='flex flex-col p-6'>

            {/*Profil*/}
            <LinearGradient
              className="rounded-lg border-[#FACC2D] border mb-4"
              colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
              locations={[0, 0, 0, 1]}
              style={( 'my-5 rounded-md border border-yellow w-full' )}
            >
            <View className='flex flex-col border rounded-lg border-[#FACC2D] p-3'>
              <View className='flex-row justify-start'>
                <View>
                  <Image source={{ uri: 'https://via.placeholder.com/50' }} className="w-12 h-12 rounded-full mr-4" />
                </View>
                <View className='flex flex-col'>
                  <Text className='text-md font-bold text-primary'>Marcheline Fanni</Text>
                  <View className='flex flex-row py-1 justify-start'>
                    <View className='border rounded-md border-[#FACC2D] p-1 mr-2'>
                      <Text className='text-xs'>2521 sessions</Text>
                    </View>
                    <View className='border rounded-md border-[#FACC2D] p-1'>
                      <Text className='text-xs'>182 badges</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='flex flex-row justify-between mt-2'>
                <View className='flex flex-col py-2 px-5 rounded-md bg-[#FACC2D] items-center'>
                  <Text className='text-xs'>Daily Rank</Text>
                  <Text className='text-sm font-bold'>10</Text>
                </View>
                <View className='flex flex-col py-2 px-4  rounded-md bg-[#FACC2D] items-center'>
                  <Text className='text-xs'>Weekly Rank</Text>
                  <Text className='text-sm font-bold'>27</Text>
                </View>
                <View className='flex flex-col py-2 px-3 rounded-md bg-[#FACC2D] items-center'>
                  <Text className='text-xs'>Monthly Rank</Text>
                  <Text className='text-sm font-bold'>38</Text>
                </View>
              </View>
            </View>
            </LinearGradient>
            {/*Ranking*/}

            <View className='flex flex-row mb-2 justify-start rounded-xl border border-[#FACC2D] bg-white overflow-hidden'>
              <View className='flex items-center justify-items-center px-4 py-8 bg-yellow'>
                <Text className='text-md font-bold'>1</Text>
              </View>
              <View className='w-20 overflow-hidden bg-grey'>
                <Image style='w-full h-full' source={require('../../assets/img/chanyeol.jpg')}></Image>
              </View>
              <View className='flex flex-col justify-center pl-3'>
                <View>
                  <Text className='text-sm font-bold'>Chanyeol</Text>
                  <View className='flex flex-row items-center'>
                    <CheckBadgeIcon color="black" size={13}/>
                    <Text className='text-xs'>155 badges</Text>
                  </View>
                  <View className='flex flex-row items-center'>
                    <ClockIcon color="black" size={13}/>
                    <Text className='text-xs'>5516 sessions</Text>
                  </View>
                </View>
              </View>
            </View>
            {data.map((item, index) => (
              <RankingCard 
                key={index}
                rank={item.rank}
                names={item.names}
                badges={item.badges}
                sessions={item.sessions}
                image={item.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Leaderboard;
