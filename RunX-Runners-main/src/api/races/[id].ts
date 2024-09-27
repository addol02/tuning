import type { App }  from '../../server'
import { t } from 'elysia'
import * as raceQuery from '@/queries/races';

import XLSX from "xlsx"

export default (app: App) => (
app.post('/upload', async ({ body: { excelFile, raceid, eventid }, set, db }) => {

    const columnsField = ['Rank','FirstName','LastName','Gender','Age', 'Score','Nation','Time'];

    var workbook = XLSX.read(await excelFile.arrayBuffer(), { type: "array" });

    // const workbook = XLSX.read(body.excelFile);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const sheetJSON_ =  JSON.parse(JSON.stringify(sheetData))

    if(sheetData) {
        const selectFirstRow = sheetJSON_[0];
        const columnValidate = columnsField.every(field => selectFirstRow.hasOwnProperty(field));

        if (columnValidate) {
            const response = await raceQuery.uploadDataToRaces(db, raceid, sheetJSON_)

            return {
                success:true,
                data:response,
                success_msg: "Data has been added in races."
            }
        } else {
            set.status = 400;
            return {
                error: true,
                error_msg: "Some fields is missing."
            }
        }
    } else {
        set.status = 400;
        return {
            error: true,
            error_msg: "Please re-check your data file."
        }
    }

   

}, {
    body: t.Object({
        excelFile: t.File(),
        raceid: t.String(),
        eventid: t.String()
    }),
    response: {
        200: 'success',
        400: 'fail'
    }
} ),
app.get('/', async ({ db, params, set, query }) => {
    
    if(set.status == 400) {
        return {
            error: true
        }
    }
    const races = await raceQuery.getByEventId(db, params.id, query);


    if(races) {
        return {
            success: true,
            data: races
        }
    } else {
        set.status = 400
        return {
            error: true
        }
    }


},{
    query: t.Object({
        sortField: t.Optional(t.String()),
        sortType: t.Optional(t.String()),
        whereField: t.Optional(t.String()),
        whereValue: t.Optional(t.String()),
        cursorId: t.Optional(t.String())
    }),
    params:t.Object({
        id: t.String()
    }),
    response: {
        200: 'success',
        400: 'fail'
    }
}))