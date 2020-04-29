import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { TextInputProps, Animated } from 'react-native';

import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string; // making it mandatory because we'll use it for the Unform lib
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(Boolean(inputValueRef.current.value)); // check if there is value inserted
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(reference: any, value) {
        inputElementRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputElementRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  // animation to wiggle input when there is an error
  const wiggleAnim = useRef(new Animated.Value(0)).current;

  const shakeButton = useCallback(() => {
    wiggleAnim.setValue(0); // resetting first
    Animated.timing(wiggleAnim, {
      duration: 400, // 400ms
      toValue: 3, // because our animation ends at 3
      useNativeDriver: true,
    }).start();
  }, [wiggleAnim]);

  const interpolated = wiggleAnim.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3], // from 0 to 3
    outputRange: [0, -20, 0, 20, 0, -20, 0], // output of the translateX
  });

  useEffect(() => {
    if (error !== undefined) {
      shakeButton();
    }
  }, [error, shakeButton]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: interpolated }],
      }}
    >
      <Container isFocused={isFocused} isErrored={Boolean(error)}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#ff9000' : '#666360'}
        />

        <TextInput
          {...rest}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          onChangeText={(value): void => {
            inputValueRef.current.value = value;
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </Container>
    </Animated.View>
  );
};

export default forwardRef(Input);
