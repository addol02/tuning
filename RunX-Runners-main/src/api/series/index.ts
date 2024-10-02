import type { App } from '../../server';
import { t } from 'elysia';
import * as seriesQuery from '@/queries/series/query'; // Import series query

export default (app: App) => app
    .get("/series", async ({ db, set, query }) => {
        const series = await seriesQuery.getAllSeries(db, query);

        if (series) {
            return {
                success: true,
                data: series
            };
        } else {
            set.status = 400;
            return {
                error: true
            };
        }
    }, {
        query: t.Object({
            seriesTitle: t.Optional(t.String()),
            startPeriod: t.Optional(t.String()),
            endPeriod: t.Optional(t.String())
        }),
        response: {
            200: "success",
            400: "fail"
        }
    })
    
    .get("/series/:id", async ({ db, set, params }) => {
        const series = await seriesQuery.getBySeriesId(db, params.id);

        if (series) {
            return {
                success: true,
                data: series
            };
        } else {
            set.status = 404;
            return {
                error: true,
                message: 'Series not found'
            };
        }
    }, {
        params: t.Object({
            id: t.String() // Assuming the ID is a string
        }),
        response: {
            200: "success",
            404: "fail"
        }
    });
