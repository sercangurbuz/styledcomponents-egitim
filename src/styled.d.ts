import 'styled-components';
import { MyTheme } from './App';

declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {}
}
