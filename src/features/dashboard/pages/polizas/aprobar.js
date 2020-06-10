import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { PageNotFound } from '../../../common';
import { useGetToken } from '../../../common/redux/hooks';
import BPDF from '../../../../components/bpdf';
import axios from 'axios';
import AprobarFormulario from './aprobar_formulario';
import BLoading from '../../../../components/bloading';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useFetchCartasNombramiento } from '../../redux/fetchCartasNombramiento';
import { useFetchCartaNombramiento } from '../../redux/fetchCartaNombramiento';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import { useFetchDropdownAseguradora } from '../../redux/fetchDropdownAseguradora';
import { useFetchDropdownTipoPoliza } from '../../redux/fetchDropdownTipoPoliza';
import { fetchDropdownProducto, useFetchDropdownProducto } from '../../redux/fetchDropdownProducto';
import { Hidden } from '@material-ui/core';


/*
  e.g. URL: /polizas/carta-nombramiento/aprobar?poliza=0334210196
*/
const Aprobar = (props) => {
  const { tipo, propia } = useParams();

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const noPoliza = query.get("poliza");

  /*
    Se debe llevar a la página de NOT FOUND si lo que se va a aprobar
    no es una carta de nombramiento o si no se suministra un número
    de poliza
  */
  if (noPoliza == null || noPoliza.trim() === "" || propia !== 'todas' || tipo !== 'aprobaciones') {
    return <PageNotFound />
  }

  return <AprobarView noPoliza={noPoliza} />;
}

const AprobarView = (props) => {
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    cartaNombramiento: false,
    aseguradora: false,
    tipoPoliza: false,
    productos: false,
  });
  const [data, setData] = useState(null);
  const [polizaAprobada, setPolizaAprobada] = useState(false);
  const { auth } = useGetToken();  

  const { cartaNombramiento, fetchCartaNombramiento, fetchCartaNombramientoPending } = useFetchCartaNombramiento();
  const { dropdownAseguradoras, fetchDropdownAseguradora, fetchDropdownAseguradoraPending } = useFetchDropdownAseguradora();
  const { dropdownTipoPoliza, fetchDropdownTipoPoliza, fetchDropdownTipoPolizaPending } = useFetchDropdownTipoPoliza();
  const { dropdownProductos, fetchDropdownProducto, fetchDropdownProductoPending } = useFetchDropdownProducto();

  useEffect(() => {
    if ( auth.tokenFirebase === "" ) return;
    if( fetchCartaNombramientoPending || fetchDropdownAseguradoraPending || fetchDropdownTipoPolizaPending || fetchDropdownProductoPending ) return;

    if ( !datosCargados.cartaNombramiento ) {
      fetchCartaNombramiento({token: auth.tokenFirebase, noPoliza: props.noPoliza});
      setDatosCargados({
        ...datosCargados,
        cartaNombramiento: true,
      });
      return;
    }

    if( cartaNombramiento && data === null ) {
      setPolizaAprobada(cartaNombramiento.revisado === true);
      setData(cartaNombramiento);
      return;
    }

    if( polizaAprobada ) {
      setLoading(false);
      return;
    }

    if ( !datosCargados.aseguradora ) {
      fetchDropdownAseguradora(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        aseguradora: true,
      });
      return;
    }

    if ( !datosCargados.tipoPoliza ) {
      fetchDropdownTipoPoliza(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        tipoPoliza: true,
      });
      return;
    }

    if ( !datosCargados.productos ) {
      fetchDropdownProducto(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        productos: true,
      });
      return;
    }

    setLoading(false);
  }, [auth.tokenFirebase, fetchCartaNombramientoPending, datosCargados, fetchCartaNombramiento, cartaNombramiento, props.noPoliza, data, polizaAprobada, fetchDropdownProductoPending, fetchDropdownTipoPolizaPending, fetchDropdownAseguradoraPending, fetchDropdownAseguradora, fetchDropdownProducto, fetchDropdownTipoPoliza]);


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  const PolizaNoEncontradaOAprobada = () => {
    return (
      <Paper className={classes.paper} variant="outlined" square>
        <Grid container spacing={3} style={{margin: "1rem 0"}}>
          <h3>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <WarningTwoToneIcon  fontSize="large" />
            &nbsp;&nbsp;{ polizaAprobada ? "La póliza ya fue aprobada" : "Póliza no encontrada" }
          </h3>
        </Grid>
      </Paper>
    );
  }


  return (
    <div>
      { loading === true ? <BLoading /> : null }
      { 
        datosCargados && !loading ? 
        (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Aprobación de Póliza: &nbsp; {props.noPoliza}
                </Typography>
              </Toolbar>
            </AppBar>

            { data === null || polizaAprobada ? <PolizaNoEncontradaOAprobada /> : null }
      
            {
              data !== null && !polizaAprobada ?
              <Paper className={classes.paper} variant="outlined" square>
                <Grid container spacing={3}>
                  <Grid item sm={12} lg={6}>
                    <AprobarFormulario data={data} dropdownAseguradoras={dropdownAseguradoras} dropdownTipoPoliza={dropdownTipoPoliza} dropdownProductos={dropdownProductos} />
                  </Grid>
                  <Hidden smDown>
                    <Grid item sm={12} lg={6}>
                      <BPDF url={data.urlPoliza} />
                    </Grid>
                  </Hidden>
                </Grid>
              </Paper> : null
            }
          </div>
        ) : 
        null 
      }
    </div>
  );
}

AprobarView.propTypes = {
  noPoliza: PropTypes.string.isRequired
}

export default Aprobar;