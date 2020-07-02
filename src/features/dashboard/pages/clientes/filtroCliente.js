import React from 'react';
import { Grid, Paper, IconButton, makeStyles, InputBase, List, ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const FiltroCliente = ({buscarClientes, handleToggle, checked, listaLocal, setChecked}) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.typography.pxToRem(10),
    },
    secondaryHeadingWhite: {
        fontSize: theme.typography.pxToRem(20),
        color: 'white',
        margin: theme.spacing(2, 0)
    },
    input: {
        marginLeft: theme.spacing(1),
    },
    iconButton: {
        padding: 5,
    },
    iconButtonMin: {
      padding: 5,
      marginLeft: theme.typography.pxToRem(-4),
      border: "#6097ef 1px solid",
      color: "#6097ef",
      "&:hover": {
        border: "white 1px solid",
        color: "white",
        background: "#6097ef",
      }
    } 
  }));
  const classes = useStyles();

  if ( checked.toString() !== "0" && checked.toString().length > 0 ) {
    return (
      <div style={{height: "calc(100% - 101px)", width: "64px", display: "inline-block"}}>
        <div className="row border-bottom filtro-cliente-container">
          <div className="col-lg-12">
            <div className="p-xs">
              <IconButton onClick={(e) => setChecked("")} color="primary" className={classes.iconButtonMin} aria-label="directions">
                <SearchIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{height: "calc(100% - 101px)", width: "351px", display: "inline-block"}}>
      <div className="row border-bottom filtro-cliente-container">
        <div className="col-lg-12">
          <div className="p-xs">

            <Paper component="form" className={classes.paper} >
              <IconButton onClick={(e) => buscarClientes(e)} color="primary" className={classes.iconButton} aria-label="directions">
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Buscar clientes"
                inputProps={{ 'aria-label': 'Buscar clientes' }}
                onChange={(event) => buscarClientes(event)}
                onKeyPress={(event) => buscarClientes(event)}
              />
            </Paper>
            <div className="lista-poliza">
                <List className={classes.root}>
                    {listaLocal.length <= 0 ? <>No hay datos para mostrar</> :
                        listaLocal.map((us) => {
                            const labelId = `checkbox-list-label-${us.username}`;
                            return (
                                <ListItem key={us.username} role={undefined} dense button onClick={handleToggle(us.username)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(us.username) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={` ${us.nombre} ${us.apellidoPaterno ? us.apellidoPaterno : ""} ${us.apellidoMaterno ? us.apellidoMaterno : ""}`} secondary={us.username} />
                                </ListItem>
                            );
                        })}
                </List>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltroCliente;