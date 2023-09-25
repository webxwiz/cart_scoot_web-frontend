"use client";

import React, { useEffect, useState } from 'react';
import Map, { Marker } from "react-map-gl";
import { toast } from 'react-toastify';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client';
import { ONE_DRIVER_REQUEST, ALL_DRIVERS_REQUEST } from 'apollo/mutations/request';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_FREE_DRIVERS } from 'apollo/queries/user';

import SendRequestButton from '../sendRequestButton/SendRequestButton';
import FindCarForm from '../findCarForm/FindCarForm';
import RequestDetailedCard from '../requestDetailedCard/RequestDetailedCard';
import AskLoginCard from '../askLoginCard/AskLoginCard';
import DriverAvatarGreen from 'components/driverAvatarGreen/DriverAvatarGreen';
import RegisterMobilePhone from 'app/map/components/registerMobilePhone/RegisterMobilePhone';

import { IFindCarFormData, useFormDataStore } from 'stores/findCarFormStore';

import { viewport } from 'constants/mapViewport';
import { IDriverWithRating } from 'types/userTypes';

import styles from './mapbox.module.scss';

export interface IMarkerClickData {
    driver: IDriverWithRating,
    findCarFormData?: IFindCarFormData,
}

const Mapbox = () => {

    const [detailedCardData, setDetailedCardData] = useState<IMarkerClickData>();
    const [openDriverDetails, setOpenDriverDetails] = useState(false);
    const [openLoginMobileCard, setOpenLoginMobileCard] = useState(false);
    const [openAddMobileCard, setOpenAddMobileCard] = useState(false);

    const { findCarFormData } = useFormDataStore();
    // console.log('findCarFormData: ', findCarFormData);

    const router = useRouter();

    const { data }: { data: { getFreeDrivers: [IDriverWithRating] } } = useSuspenseQuery(GET_FREE_DRIVERS, {
        variables: {
            getFreeDriversInput: {
                requestedTime: findCarFormData?.requestedTime,
            }
        }
    });
    const [allDriversRequest] = useMutation(ALL_DRIVERS_REQUEST);
    const [oneDriverRequest] = useMutation(ONE_DRIVER_REQUEST);

    useEffect(() => {
        const driverAmount = data?.getFreeDrivers.length;
        if (driverAmount > 0) {
            toast.success(`Founded ${driverAmount} cars`, {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else if (!driverAmount) {
            toast.warn("Cars not found", {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }

    }, [data?.getFreeDrivers.length]);

    const openLoginModal = () => setOpenLoginMobileCard(true);
    const closeLoginModal = () => setOpenLoginMobileCard(false);

    // const formData = (data: IFormData) => setSavedFormData(data);
    const markerClick = (driver: IDriverWithRating) => {
        setDetailedCardData({ 
            driver, 
            findCarFormData 
        });
        setOpenDriverDetails(true);
    };
    const closeDriverDetails = () => setOpenDriverDetails(false);

    const openPhoneCard = () => {
        console.log('open Card');
        setOpenLoginMobileCard(false);
        setOpenAddMobileCard(true);
    };

    const closeMobileCard = () => setOpenAddMobileCard(false);

    const sendOneRequestClick = async () => {
        try {
            const { data } = await oneDriverRequest({
                variables: {
                    createOneDriverRequestInput: {
                        id: detailedCardData?.driver.driver._id,
                        requestedTime: findCarFormData?.requestedTime,
                        coordinates: {
                            start: {
                                lat: findCarFormData?.locationData?.pickup.lat,
                                lon: findCarFormData?.locationData?.pickup.lon,
                            },
                            end: {
                                lat: findCarFormData?.locationData?.dropoff.lat,
                                lon: findCarFormData?.locationData?.dropoff.lon,
                            },
                        },
                        pickupLocation: findCarFormData?.locationData?.pickup.address,
                        dropoffLocation: findCarFormData?.locationData?.dropoff.address,
                    }
                },
            });
            if (data.createOneDriverRequest.request._id) {
                router.push(`/request-sent-message/${data.createOneDriverRequest.request.requestCode}`);
                toast.success('Request sent successfully', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            }
        } catch (err: any) {
            toast.warn(err.message, {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }
    };

    const sendAllRequestClick = async () => {
        // console.log('sendAllRequestClick');
        try {
            const { data } = await allDriversRequest({
                variables: {
                    createDriversRequestInput: {
                        requestedTime: findCarFormData?.requestedTime,
                        coordinates: {
                            start: {
                                lat: findCarFormData?.locationData?.pickup.lat,
                                lon: findCarFormData?.locationData?.pickup.lon,
                            },
                            end: {
                                lat: findCarFormData?.locationData?.dropoff.lat,
                                lon: findCarFormData?.locationData?.dropoff.lon,
                            },
                        },
                        pickupLocation: findCarFormData?.locationData?.pickup.address,
                        dropoffLocation: findCarFormData?.locationData?.dropoff.address,
                    }
                },
            });
            if (data.createDriversRequest.request._id) {
                toast.success('Requests sent successfully to all drivers', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            }
        } catch (err: any) {
            toast.warn(err.message, {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    initialViewState={viewport}
                    style={{ borderRadius: 20 }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                    {data?.getFreeDrivers.map(driver => (
                        <Marker
                            latitude={driver.driver.coordinates?.lat}
                            longitude={driver.driver.coordinates?.lon}
                            key={driver.driver._id}
                            onClick={() => markerClick(driver)}
                        >
                            {detailedCardData?.driver.driver._id === driver.driver._id ?
                                <DriverAvatarGreen
                                    driverAvatarURL={driver.driver.avatarURL}
                                    driverName={driver.driver.userName}
                                />
                                :
                                <DriverAvatarGreen
                                    driverAvatarURL={driver.driver.avatarURL}
                                    driverName={driver.driver.userName}
                                    hideName={true}
                                />
                            }
                        </Marker>
                    ))}
                </Map>
                <FindCarForm openLoginModal={openLoginModal} closeDriverDetails={closeDriverDetails} />
                {findCarFormData?.locationData &&
                    findCarFormData.requestedTime &&
                    data.getFreeDrivers.length &&
                    <SendRequestButton sendAllRequestClick={sendAllRequestClick} />
                }
            </div>
            {detailedCardData && openDriverDetails &&
                <RequestDetailedCard
                detailedCardData={detailedCardData}
                    closeDriverDetails={closeDriverDetails}
                    sendAllRequestClick={sendAllRequestClick}
                    sendOneRequestClick={sendOneRequestClick}
                />}
            {openLoginMobileCard &&
                <AskLoginCard
                    closeLoginModal={closeLoginModal}
                    openPhoneCard={openPhoneCard}
                />
            }
            {openAddMobileCard &&
                <RegisterMobilePhone handleClose={closeMobileCard} />
            }
        </div>
    );
};

export default Mapbox;