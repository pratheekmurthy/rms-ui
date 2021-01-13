
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
   
    var result = Object.keys(DownloadData[0])
    var header = {};
    for (var i = 0; i < result.length; i += 1) {
        header[result[i]] = result[i];
    }
    const classes = useStyles();
    const filename = 'Download',
        fields = header,
        style = {
            padding: "5px"
        },
        data = DownloadData,
        text = "Download";
    return (
        <div>
            <JsonToCsv
                data={data}
                filename={filename}
                fields={fields}
                style={style}
                text={text}
            />
        </div>

    );
}
