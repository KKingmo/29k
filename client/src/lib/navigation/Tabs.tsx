import React, {useMemo} from 'react';
import {Platform} from 'react-native';
import {
  BottomTabNavigationOptions,
  BottomTabBar,
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';

import {
  IconType,
  JourneyIcon,
  JourneyFillIcon,
  SunUpIcon,
  SunUpFillIcon,
  ExploreIcon,
  ExploreFillIcon,
} from '../components/Icons';
import {COLORS} from '../../../../shared/src/constants/colors';
import {TabNavigatorProps} from './constants/routes';
import {SPACINGS} from '../constants/spacings';
import {Body14} from '../components/Typography/Body/Body';
import {BottomSafeArea} from '../components/Spacers/Spacer';

import Home from '../../routes/screens/Home/Home';
import ExploreStack from './ExploreStack';
import JourneyStack from './JourneyStack';

const Tab = createBottomTabNavigator<TabNavigatorProps>();

const StyledText = styled(Body14)<{color: string}>(({color}) => ({
  color,
}));

// This component overrides the way SafeAreaInsets are handled so we have better styling control.
const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  descriptors,
}) => (
  <>
    <BottomTabBar
      state={state}
      navigation={navigation}
      descriptors={descriptors}
      insets={{top: 0, left: 0, right: 0, bottom: 0}}
    />
    <BottomSafeArea />
  </>
);

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: Platform.select({android: true, ios: false}),
  tabBarAllowFontScaling: false,
  tabBarActiveTintColor: COLORS.GREYDARK,
  tabBarInactiveTintColor: COLORS.BLACK,
  tabBarStyle: {
    height: 46 + SPACINGS.EIGHT * 2,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  tabBarItemStyle: {
    paddingVertical: SPACINGS.EIGHT,
    height: 46 + SPACINGS.EIGHT * 2,
  },
};

const getTabOptions: (
  InactiveIcon: IconType,
  ActiveIcon: IconType,
  label: string,
) => BottomTabNavigationOptions = (InactiveIcon, ActiveIcon, label) => ({
  tabBarIcon: ({focused}) =>
    focused ? <ActiveIcon /> : <InactiveIcon fill={COLORS.GREYDARK} />,
  tabBarLabel: ({focused}) => (
    <StyledText color={focused ? COLORS.BLACK : COLORS.GREYDARK}>
      {label}
    </StyledText>
  ),
});

const Tabs = () => {
  const {t} = useTranslation('Component.Tabs');

  const homeOptions = useMemo(
    () => getTabOptions(SunUpIcon, SunUpFillIcon, t('home')),
    [t],
  );

  const exploreOptions = useMemo(
    () => getTabOptions(ExploreIcon, ExploreFillIcon, t('explore')),
    [t],
  );

  const journeyOptions = useMemo(
    () => getTabOptions(JourneyIcon, JourneyFillIcon, t('journey')),
    [t],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions} tabBar={TabBar}>
      <Tab.Screen name={'Home'} component={Home} options={homeOptions} />
      <Tab.Screen
        name={'ExploreStack'}
        component={ExploreStack}
        options={exploreOptions}
      />
      <Tab.Screen
        name={'JourneyStack'}
        component={JourneyStack}
        options={journeyOptions}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
