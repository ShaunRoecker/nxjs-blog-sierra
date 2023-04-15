import React, { useCallback, useEffect, useState } from "react";
import { read, utils, writeFileXLSX } from 'xlsx';


export default function SheetJSReactAoO() {
  /* the component state is an array of presidents */
  const [pres, setPres] = useState([]);

  /* Fetch and update the state once */
  useEffect(() => { (async() => {
    const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
    const wb = read(f); // parse the array buffer
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const data = utils.sheet_to_json(ws); // generate objects
    setPres(data); // update state
  })(); }, []);

  /* get state data and export to XLSX */
  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(pres);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
  }, [pres]);

  console.log(pres)

  return (
    <div>
        <div>
        {
            pres.map( pres => (
                <tr>
                    <td>{pres.Name}</td>
                    <td>{pres.Index}</td>
                </tr>
                )
            )
        }
        </div>
        <div>
            { pres.map( pr => (
                pr.__rowNum__
            )
            )}
        </div>
    </div>
  )
            
 
};