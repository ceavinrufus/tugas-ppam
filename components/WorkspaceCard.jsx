import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const WorkspaceCard = ({ imageUrl, workspaceName, members, activeHours }) => {
  return (
    <View className='flex-row items-center p-4 bg-white rounded-lg shadow-md m-2'>
      <Image source={{ uri: imageUrl }} style={tailwind('w-12 h-12 rounded-full mr-4')} />
      <View className='flex-1'>
        <Text className='text-lg font-bold mb-1'>{workspaceName}</Text>
        <Text className='text-sm text-gray-600'>Members: {members}</Text>
        <Text className='text-sm text-gray-600'>Active Hours: {activeHours}</Text>
      </View>
      <Icon name="arrow-forward" type="material" color="#000" />
    </View>
  );
};

export default WorkspaceCard;
