import { THEME } from "../config/localStorage";
// gets the dimensions of the current window
export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
//Values for the dark teheme
export const darkTheme = {
  name: "dark",
  navbar: "dark",
  backgroundRGB: "rgba(128, 128, 128, 0.7)",
  toast: "dark",
  button: "btn btn-secondary",
  table: "table table-striped",
  dropdown: "white",
  avatar: ['grey', 'lightgrey', 'silver'],
  to: "lightslategray",
  from: "dimgray",
  carousel: ""
}
//Values for the light theme
export const lightTheme = {
  name: "light",
  navbar: "light",
  backgroundRGB: "rgba(173, 216, 230, 0.7)",
  toast: "light",
  button: "btn btn-primary",
  table: "table table-info table-striped",
  dropdown: "black",
  avatar: ['cyan', 'lightblue', 'blue'],
  to: "white",
  from: "lightcyan",
  carousel: ""
}
//Changes the theme by loading it into local storage
export function changeTheme() {
  const currentThemeStr = localStorage.getItem(THEME)
  const currentTheme = JSON.parse(currentThemeStr)
  if (currentTheme.name === "dark") {
    localStorage.setItem(THEME, JSON.stringify(lightTheme))
  } else if (currentTheme.name === "light") {
    localStorage.setItem(THEME, JSON.stringify(darkTheme))
  }
  window.dispatchEvent(new Event("storage"))
}
//Returns space used in local storage
export function storageTotal() {
  var lsTotal = 0,
    xLen, x;
  for (x in localStorage) {
    if (!localStorage.hasOwnProperty(x)) {
      continue;
    }
    xLen = ((localStorage[x].length + x.length) * 2);
    lsTotal += xLen;
    
  };
  return ("Total = " + (lsTotal / 1024).toFixed(2) + " KB")
}