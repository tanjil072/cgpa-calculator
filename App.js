
import { createStackNavigator, createAppContainer } from 'react-navigation';  
  
import Splash from './Splash';
import Cgpa from './Cgpa';

const App=createStackNavigator({
  Splash:{screen:Splash,navigationOptions:{header:null}},
  Cgpa:{screen:Cgpa,navigationOptions:{header:null}}

})
  
export default createAppContainer(App);