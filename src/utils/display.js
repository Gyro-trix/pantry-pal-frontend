import { THEME } from "../config/localStorage";

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export const darkTheme ={
  name:"dark",
  navbar:"dark",
  backgroundRGB:"rgba(128, 128, 128, 0.7)",
  toast:"dark",
  button:"btn btn-secondary",
  table:"table table-striped",
  dropdown:"white",
  avatar:['grey', 'lightgrey', 'silver'],
  to:"lightslategray",
  from:"dimgray "
}
export const lightTheme ={
  name:"light",
  navbar:"light",
  backgroundRGB:"rgba(173, 216, 230, 0.7)",
  toast:"light",
  button:"btn btn-primary",
  table:"table table-info table-striped",
  dropdown:"black",
  avatar:['cyan', 'lightblue', 'blue'],
  to:"white",
  from:"lightcyan"
}

export function changeTheme(){
  const currentThemeStr = localStorage.getItem(THEME)
  const currentTheme = JSON.parse(currentThemeStr)
  if(currentTheme.name === "dark"){
    localStorage.setItem(THEME,JSON.stringify(lightTheme))
  } else if (currentTheme.name === "light"){
    localStorage.setItem(THEME,JSON.stringify(darkTheme))
  }
  window.location.reload()
}