import React, {useState} from 'react';
import { Text, View, Image, SafeAreaView, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
import {ChevronRightIcon, UsersIcon} from 'react-native-heroicons/outline'
import { UserIcon, BoltIcon } from 'react-native-heroicons/micro'

const Spaces = () => {
  const spaces = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      name: 'Space 1',
      members: 10,
      sessions: '2 Hours',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Space 2',
      members: 15,
      sessions: '4 Hours',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/50',
      name: 'Space 3',
      members: 15,
      sessions: '4 Hours',
    }
    // Add more spaces as needed
  ];

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex flex-row mt-9 justify-center items-center ">
          <UsersIcon color="black" size={25}/>
          <Text className='text-lg font-bold'>Spaces</Text>
        </View>
        <View className="px-4 mt-1 mb-8 w-11/12 mx-auto">
            {spaces.map((space) => (
              <View key={space.id} className="flex flex-row bg-white rounded-lg border border-blue-200 border-solid p-4 my-2">
                <View className="flex items-center justify-center">
                  <View>
                    <Image source={{ uri: space.image }} className="w-12 h-12 rounded-full mr-4" />
                  </View>
                </View>
                <View className="flex-1 justify-center">
                  <View className='content-center'>
                    <Text className="text-sm font-bold">{space.name}</Text>
                    <Text className="text-xs text-gray-600">Members: {space.members}</Text>
                    <Text className="text-xs text-gray-600">Sessions: {space.sessions}</Text>
                  </View>
                </View>
                <View className='flex flex-row items-center justify-center'>
                  <View className='flex'>
                    <TouchableOpacity onPress={show}>
                      <ChevronRightIcon color="black" size={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={hide}
      >
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="bg-[#FACC2D] p-2 rounded-md max-w-xs">
            <View className='flex flex-col p-4'>
              <View className='flex flex-row justify-start mb-4'>
                <View className='w-14 h-14 bg-secondary'></View>
                <View className='flex flex-col justify-center pl-2'>
                  <Text className='text-sm font-bold text-primary'>Space</Text>
                  <View className='flex flex-row items-center'>
                    <UserIcon color="black" size={13}/>
                    <Text className='text-xs'>15 members</Text>
                  </View>
                  <View className='flex flex-row items-center'>
                    <BoltIcon color="black" size={13}/>
                    <Text className='text-xs'>4 Hours sessions</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text className='text-justify'>Space Tergacor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</Text>
              </View>
              <View className="flex flex-row justify-around mt-4">
                {/* <Button title="Cancel" onPress={hide} className="mr-2" />
                <Button title="Join" onPress={hide} /> */}
                <TouchableOpacity onPress={hide}>
                  <View className='w-28 h-8 bg-secondary rounded-md items-center justify-center'>
                    <Text className='font-bold'>Cancel</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={hide}>
                  <View className='w-28 h-8 bg-primary rounded-md items-center justify-center'>
                    <Text className='font-bold text-white'>Join</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Spaces;
