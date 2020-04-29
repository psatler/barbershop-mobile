import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { normalize } from '../../utils/responsive';

export const Container = styled(RectButton)`
  width: 100%;
  height: ${normalize(60, 'height')}px;
  background: #ff9000;
  border-radius: ${normalize(10, 'height')}px;
  margin-top: ${normalize(8)}px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: ${normalize(18)}px;
`;
