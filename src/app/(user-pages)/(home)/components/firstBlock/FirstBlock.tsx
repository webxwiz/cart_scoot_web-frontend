import React from 'react';

import Image from 'next/image';

import styles from './firstBlock.module.scss';

const FirstBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.block}>
                <div className={styles.main_box}>
                    <h3 className='block-title'>
                        How it work?
                    </h3>
                    <p className='block-subtitle'>
                        Discover Effortless Golf Cart Adventures with Car Scoot&apos;s Booking Process.
                    </p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/magnifyingGlass.svg'}
                        alt={'glass'}
                        width={24}
                        height={24}
                    />
                    <p>1. Search cars</p>
                    <p>Search and find a car</p>
                </div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/cursor.svg'}
                        alt={'glass'}
                        width={24}
                        height={24}
                    />
                    <p>2. Choose a car</p>
                    <p>Review the driver and choose</p>
                </div>
                <div className={styles.step_box}>
                    <Image
                        src={'/icons/checkCircle.svg'}
                        alt={'glass'}
                        width={24}
                        height={24}
                    />
                    <p>3. Book a car</p>
                    <p>Book a car and pay in cash</p>
                </div>
            </div>
        </section>
    );
};

export default FirstBlock;