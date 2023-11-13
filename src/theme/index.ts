import { components } from "./components";
import { styles } from "./styles";
import { foundations } from "./foundations";
import { semanticTokens } from "./semantic-tokens";
import type { ThemeConfig, ThemeDirection } from "./theme.types";

const direction: ThemeDirection = "ltr";

export const theme = {
  semanticTokens,
  direction,
  components,
  ...foundations,
  styles,
};

export type Theme = typeof theme;

export default theme;

export const baseTheme = {
  components: {},
  ...foundations,
  styles,
};
