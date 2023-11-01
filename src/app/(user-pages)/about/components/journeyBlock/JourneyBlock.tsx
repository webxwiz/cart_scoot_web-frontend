import Image from "next/image";
import Link from "next/link";

import MiniCard from 'components/miniCard/MiniCard';

import styles from './journeyBlock.module.scss';

const JourneyBlock = () => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.miniCard_box}>
                    <div className={styles.first_box}>
                        <MiniCard
                            src='/icons/driver.svg'
                            alt='driver'
                            title='260 +'
                            subtitle='Drivers'
                        />
                        <MiniCard
                            src='/icons/carSimple.svg'
                            alt='car'
                            title='6 +'
                            subtitle='Type of Cars'
                        />
                    </div>
                    <div className={styles.second_box}>
                        <MiniCard
                            src='/icons/user-green-thin.svg'
                            alt='user'
                            title='32.5k +'
                            subtitle='Active users'
                        />
                        <MiniCard
                            src='/icons/mapPin-green.svg'
                            alt='location'
                            title='60 +'
                            subtitle='Locations & Cities'
                        />
                    </div>
                </div>
                <div className={styles.text_box}>
                    <h3 className='block-title'>
                        Our Journey<br />
                        from Fairway Dreams<br />
                        to Car Scoot&apos;s Tee-rrific Vision
                    </h3>
                    <p className='block-subtitle'>
                        At Car Scoot, We Pave the Way for Boundless Golfing
                        Excursions, Guided by Passion, Fueled by Precision, and
                        Driven by the Desire to Elevate Every Swing into an
                        Unparalleled Journey of Joy and Discovery.
                    </p>
                    <div className={styles.line}></div>
                    <div className={styles.link_box}>
                        <Link href={'/map'} className={styles.link}>
                            <Image
                                src={'/icons/bell.svg'}
                                alt={'bell'}
                                width={48}
                                height={48}
                            />
                            <span>Book Golf Car</span>
                        </Link>
                        <Link href={'/register'} className={styles.link}>
                            <Image
                                src={'/icons/driver.svg'}
                                alt={'bell'}
                                width={48}
                                height={48}
                            />
                            <span>Sign up as Driver</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneyBlock;