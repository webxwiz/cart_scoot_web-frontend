import React from 'react';

import ReviewPanel from './components/reviewPanel/ReviewPanel';
import TitleBox from './components/titleBox/TitleBox';

import { getUserByToken } from 'apollo/services/getUserByToken';

import styles from './driver-rate-and-comments.module.scss';

const DriverCommentsPage = async () => {

    const data = await getUserByToken();

    return (
        <div className={styles.wrapper}>
            <TitleBox user={data?.getUserByToken} />
            <ReviewPanel user={data?.getUserByToken} />
        </div>
    );
};

export default DriverCommentsPage;