import React, { useEffect, useState } from 'react';

import CardRunnersTop from '@/components/CardRunnersTop.tsx';
import { TypeRunnersListData } from '@/components/CardRunnersTop.tsx';
import _ from 'lodash';
import HomeHeader from '@/components/HomeHeader.tsx';
import { api } from '@/Elysia.ts';

export interface RankingData {
    [key: string]: TypeRunnersListData[]
}

interface FetchRankingType {
    distance?: string;
    limit?: string;
}


function RankingDistance() {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [rankingData, setRankingData] = useState<RankingData>();

    const distanceFilter = ["10","21","42"];

    const fetchRankingData = async (obj: FetchRankingType) => {
        
        obj.distance = distanceFilter.join(",");
        obj.limit = "3";

        const {data: value, error: errorInfo} = await api.api.runners.rankingByDistance.get({ $query: obj });
        if(value && !errorInfo) {
            setRankingData(value.data)
            setLoading(true);
        }   
    }

    useEffect(() => {
        fetchRankingData({});
    },[])

    return (
        <>
            <HomeHeader headTitle={`Ranking By Distance`}/>
            <div className="relative flex flex-row flex-wrap items-center justify-center xs:mt-[1rem] lg:mt-10 xs:p-2 sm:p-0">
                <div className="flex flex-row flex-wrap xs:w-11/12 lg:w-3/4">
                    <div className="xs:w-full md:w-[100%] xs:mt-0 md:mt-0 lg:mt-0">
                        <div className="flex flex-wrap flex-col">
                            <div className="flex flex-wrap items-start flex-row justify-between mb-5">
                                
                                {rankingData ? distanceFilter.map((distance,y) => (
                                    <CardRunnersTop key={y} data={_.get(rankingData, `${distance}`)} headlineTxt={`${distance}`}/>
                                    ) 
                                ) : (
                                    <>Loading....</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default RankingDistance;
