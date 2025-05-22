import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
};

const customRender = (ui: React.ReactElement) => {
  return render(ui, {
    wrapper: AllProviders,
  });
};

export * from '@testing-library/react';
export { customRender as render };
