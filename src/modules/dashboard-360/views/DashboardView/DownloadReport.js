
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import {
    JsonToCsv,
    useJsonToCsv
} from 'react-json-csv';
const useStyles = makeStyles(theme => ({

}));

const { saveAsCsv } = useJsonToCsv();
export default function DownloadReport({ DownloadData }) {
    const classes = useStyles();
    var filename = 'Download',
    fields = {
       "no data" :"no data"
    },
    style = {
        padding: "5px"
    },
    data =[{
        "no data":""
    }],
    text = "Download";
   if(DownloadData.length){
   
    var result = Object.keys(DownloadData[0])
    var header = {};
    for (var i = 0; i < result.length; i += 1) {
        header[result[i]] = result[i];
    }
    var filename = 'Download',
    fields = header,
    style = {
        padding: "5px"
    },
    data = DownloadData,
    text = "Download";
    
   
    }
    else{
        var filename = 'Download',
        fields = {
           "no data" :""
        },
        style = {
            padding: "5px"
        },
        data =[{
            "no data":"no data"
        }],
        text = "Download";
    }
    return (
        <div>
         {DownloadData.length ?  <JsonToCsv
                data={data}
                filename={filename}
                fields={fields}
                style={style}
                text={text}
            />:<></>}
        </div>

    );
}
