import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BLoading from '../../../../components/bloading';
import { Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';
import { Pie } from 'react-chartjs-2';

const Grafico = ({ grafico }) => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
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
    }));
    const classes = useStyles();

    const [colores,] = useState([
        { color: "#2A4D69", hover: "#2F5675" },
        { color: "#4B86B4", hover: "#5191C2" },
        { color: "#ADCBE3", hover: "#B6D6F0" },
        { color: "#63ACE5", hover: "#68B6F2" },
        { color: "#CED5DB", hover: "#DAE2E8" },
        { color: "#9C8D78", hover: "#A89882" },
        { color: "#C7E2C0", hover: "#D3F0CC" },
        { color: "#7281B4", hover: "#7A8BC2" },
        { color: "#91AA9D", hover: "#9CB8A9" },
        { color: "#DBCBBD", hover: "#E8D7C8" },
    ]);

    const [data, setData] = useState({
        labels: grafico.map(x => x.tipoPoliza),
        datasets: [{
            data: grafico.map(x => x.cantidadPolizas),
            backgroundColor: colores.map(item => item.color),
            hoverBackgroundColor: colores.map(item => item.hover),
        }]
    })

    const commaFormat = (num) => {
        let strNum = num.toString();
        let strSplit = strNum.split(",");
        let result = "";
        let digitSplit = strSplit[0].split("");
        let decSplit = (strSplit[1]) ? ("," + strSplit[1]) : ("");
        let digitSplitMod = digitSplit.length % 3 - 1;
    
        if( digitSplit.length > 3 ) {
          for( let i=0; i<digitSplit.length-3; i++ ) {
            if( i % 3 === digitSplitMod ) {
              digitSplit[i] = digitSplit[i] + ","
            }
          }
        }
        result = digitSplit.join("") + decSplit;
        return result;
      }


    return (
        <div className="panel panel-default" style={{ marginBottom: "20px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Número de pólizas por tipo</span>
                <br /><br />
                <div class="flot-chart">
                    <div class="flot-chart-pie-content" id="flot-pie-chart">
                        <Pie
                            className={""}
                            data={data}
                            height="300"
                            width="300"
                            options={{
                                tooltips: {
                                    callbacks: {
                                        label: (tooltipItem, data) => {
                                            let value = data.datasets[0].data[tooltipItem.index];
                                            return commaFormat(value);
                                        },
                                        title: (tooltipItem, data) => {
                                            return data.labels[tooltipItem[0].index];
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Grafico;