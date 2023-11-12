import { components } from "./components";
import { styles } from "./styles";

export const theme = {
  components,
  styles,
};

export type Theme = typeof theme;

export default theme;

export const baseTheme = {
  components: {},
  styles,
};
