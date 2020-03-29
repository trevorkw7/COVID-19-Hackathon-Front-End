import { createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2A4849',
    },
    secondary: {
      main: '#29AB87',
    },
    status: {
      danger: 'orange',
    },
  }
});

export default theme;
