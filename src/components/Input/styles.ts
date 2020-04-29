import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { normalize } from '../../utils/responsive';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  /* height: 60px; */
  height: ${normalize(60, 'height')}px;
  padding: 0 ${normalize(16)}px;
  background: #232129;
  /* border-radius: 10px; */
  border-radius: ${normalize(10)}px;
  margin-bottom: ${normalize(8)}px;
  border-width: 2px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: ${normalize(16)}px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: ${normalize(16)}px;
`;
