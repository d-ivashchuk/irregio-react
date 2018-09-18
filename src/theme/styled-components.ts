import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import IThemeInterface from "./theme";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
