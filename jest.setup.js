jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    TouchableOpacity: View,
    TouchableWithoutFeedback: View,
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    Directions: {},
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('react-native-gifted-charts', () => ({
  BarChart: 'BarChart',
  PieChart: 'PieChart',
  LineChart: 'LineChart',
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
