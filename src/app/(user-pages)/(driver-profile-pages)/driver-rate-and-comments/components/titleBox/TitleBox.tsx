"use client";

import React from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_DRIVER_RATING } from 'apollo/queries/review';

import StarsBox from 'components/starsBox/StarsBox';

import styles from './titleBox.module.scss';

const TitleBox: React.FC<{ totalCount?: number }> = ({ totalCount }) => {

    const { data }: { data: { getDriverRating: { avgRating: number, totalCount: number } } } = useSuspenseQuery(GET_DRIVER_RATING);

    return (
        <div className={styles.title_container}>
            <div className={styles.title_box}>
                <h2 className={styles.profile_title}>Rate & comments</h2>
                <div className={styles.review_amount}>{totalCount}</div>
            </div>
            <StarsBox totalCount={totalCount} avgRating={data?.getDriverRating?.avgRating} />
        </div>
    );
};

export default TitleBox;


//.filter(item => Boolean(item.text))