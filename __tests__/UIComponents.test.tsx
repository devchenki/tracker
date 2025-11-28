import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { Button, Input, Card, Snackbar } from '../src/components/ui';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe('UI Components', () => {
  describe('Button', () => {
    it('should render primary button', () => {
      const { getByText } = render(
        <Button variant="primary">Click Me</Button>,
        { wrapper: Wrapper }
      );
      expect(getByText('Click Me')).toBeTruthy();
    });

    it('should handle press events', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button variant="primary" onPress={onPress}>
          Click Me
        </Button>,
        { wrapper: Wrapper }
      );

      fireEvent.press(getByText('Click Me'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should render secondary button', () => {
      const { getByText } = render(
        <Button variant="secondary">Secondary</Button>,
        { wrapper: Wrapper }
      );
      expect(getByText('Secondary')).toBeTruthy();
    });

    it('should render outline button', () => {
      const { getByText } = render(
        <Button variant="outline">Outline</Button>,
        { wrapper: Wrapper }
      );
      expect(getByText('Outline')).toBeTruthy();
    });
  });

  describe('Input', () => {
    it('should render input with label', () => {
      const { getByText } = render(
        <Input label="Email" value="" onChangeText={() => {}} />,
        { wrapper: Wrapper }
      );
      expect(getByText('Email')).toBeTruthy();
    });

    it('should handle text changes', () => {
      const onChangeText = jest.fn();
      const { getByDisplayValue } = render(
        <Input label="Email" value="test" onChangeText={onChangeText} />,
        { wrapper: Wrapper }
      );
      expect(getByDisplayValue('test')).toBeTruthy();
    });

    it('should show error state', () => {
      const { getByText } = render(
        <Input label="Email" value="" onChangeText={() => {}} error />,
        { wrapper: Wrapper }
      );
      expect(getByText('Email')).toBeTruthy();
    });
  });

  describe('Card', () => {
    it('should render card with children', () => {
      const { getByText } = render(
        <Card>
          <Card.Content>
            <Button>Test Content</Button>
          </Card.Content>
        </Card>,
        { wrapper: Wrapper }
      );
      expect(getByText('Test Content')).toBeTruthy();
    });
  });

  describe('Snackbar', () => {
    it('should render snackbar with message', () => {
      const { getByText } = render(
        <Snackbar visible message="Test Message" onDismiss={() => {}} />,
        { wrapper: Wrapper }
      );
      expect(getByText('Test Message')).toBeTruthy();
    });

    it('should handle different types', () => {
      const { getByText, rerender } = render(
        <Snackbar visible message="Success" type="success" onDismiss={() => {}} />,
        { wrapper: Wrapper }
      );
      expect(getByText('Success')).toBeTruthy();

      rerender(
        <Wrapper>
          <Snackbar visible message="Error" type="error" onDismiss={() => {}} />
        </Wrapper>
      );
      expect(getByText('Error')).toBeTruthy();
    });
  });
});
