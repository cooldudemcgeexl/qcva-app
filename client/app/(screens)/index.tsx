
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';


export default function TabOneScreen() {
  return (
    <View className='flex-1 justify-center items-center' >
      <Text className='text-4xl text-red-800'>Tab One</Text>
      <View  className='h-1 w-4/5 my-8'/>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

