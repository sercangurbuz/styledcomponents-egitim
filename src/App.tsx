import React, { useState } from 'react';
import styled, {
  css,
  DefaultTheme,
  ThemedStyledProps,
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components';

import { darken, lighten } from 'polished';

interface AppProps {}

interface ItemProps {
  done?: boolean;
}

const TodoContainer = styled.div`
  font-size: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background:#ebebeb;

  > *:not(:first-child) {
    margin-top: 6px;
  }
`;

const doneMixin = ({
  done,
  theme: { itemBgColor },
}: ThemedStyledProps<ItemProps, DefaultTheme>) =>
  done &&
  css`
    text-decoration: line-through;
    color: gray;
  `;

const itemBoxingMixin = (props: ThemedStyledProps<ItemProps, DefaultTheme>) =>
  css`
    padding: 4px 6px;
  `;

export const Item = styled.div<ItemProps>`
  box-shadow: 1px 1px 3px #141414a1;

  color: ${({ theme: { itemColor } }) => itemColor};
  background: ${({ theme: { itemBgColor } }) => itemBgColor};

  ${itemBoxingMixin};
  ${doneMixin};

  &:hover {
    background: ${({ theme: { itemBgColor } }) => darken(0.15, itemBgColor)};
  }

  ${TodoContainer}:hover & {
    transform: scale(1.012);
  }
`;

export const DeletedItem = styled(Item).attrs({ done: true })`
  color: red;
`;

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .modalWrapperClass {
        background:#141414;
    }
`;

export interface MyTheme {
  itemColor: string;
  itemBgColor: string;
  itemDeletedColor: string;
}

function App(props: AppProps) {
  const [theme, setTheme] = useState<string>('dark');

  const themes: Record<string, MyTheme> = {
    default: {
      itemColor: '#141414',
      itemBgColor: '#fff',
      itemDeletedColor: 'red',
    },
    dark: {
      itemColor: '#fff',
      itemBgColor: '#141414',
      itemDeletedColor: 'red',
    },
  };

  return (
    <>
      <StyledThemeSwitcher
        onToggle={() => setTheme((p) => (p === 'dark' ? 'default' : 'dark'))}
      />
      <ThemeProvider theme={themes[theme]}>
        <GlobalStyle />
        <TodoContainer>
          <Item done={true}>Read the docs</Item>
          <Item done={true}>Practice what u have learnt</Item>
          <Item>Give a lesson</Item>
          <Item>Practice more</Item>
          <DeletedItem>Deleted Item</DeletedItem>
        </TodoContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

interface ThemeSwitcherProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onToggle?: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

function ThemeSwitcher({ onToggle, ...rest }: ThemeSwitcherProps) {
  return (
    <button onClick={onToggle} {...rest}>
      Toggle theme
    </button>
  );
}

const StyledThemeSwitcher = styled(ThemeSwitcher)``;
