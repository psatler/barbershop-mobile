import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { normalize } from '../../utils/responsive';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 ${normalize(30)}px ${normalize(100, 'height')}px;
`;

export const Title = styled.Text`
  font-size: ${normalize(24)}px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';

  /* 64px top, 0px at the sides, 24px at the bottom  */
  margin: ${normalize(64, 'height')}px 0 ${normalize(24, 'height')}px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: ${normalize(24)}px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: ${normalize(16)}px;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: ${normalize(16, 'height')}px 0 ${normalize(16) + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #ff9000;
  font-size: ${normalize(18)}px;
  font-family: 'RobotoSlab-Regular';
  margin-left: ${normalize(16)}px;
`;
