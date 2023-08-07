import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Login from './app/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='My Routinity'>
        <Stack.Screen name='My Routinity' component={List}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}