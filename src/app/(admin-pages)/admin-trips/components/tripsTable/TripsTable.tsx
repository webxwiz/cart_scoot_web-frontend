"use client";

import React from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import DriverAvatar from 'components/driverAvatar/DriverAvatar';

import { IRequestWithAllUsersPopulatedFields, statusTypes } from 'types/requestTypes';

import styles from './tripsTable.module.scss';

const TripsTable: React.FC<{ trips: [IRequestWithAllUsersPopulatedFields] }> = ({ trips }) => {

    const router = useRouter();
    const handleClick = (_id: string) => router.push(`/admin-trips/${_id}`);

    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th><div>#</div></th>
                    <th><div style={{ minWidth: '142px' }}>Request Code</div></th>
                    <th><div>Rider</div></th>
                    <th><div>Driver</div></th>
                    <th><div style={{ minWidth: '161px' }}>Req Date & Time</div></th>
                    <th><div>Status</div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {trips?.map((item: IRequestWithAllUsersPopulatedFields, i: number) => (
                    <tr key={i}>
                        <td><div>{i + 1}</div></td>
                        <td><div>{item.requestCode}</div></td>
                        <td>
                            <DriverAvatar
                                driverAvatarURL={item.userId?.avatarURL}
                                driverName={item.userId?.userName}
                            />
                        </td>
                        <td>
                            <DriverAvatar
                                driverAvatarURL={item.driverId?.avatarURL}
                                driverName={item.driverId?.userName}
                            />
                        </td>
                        <td><div>{format(new Date(item.requestedTime), "d LLL H:mm")}</div></td>
                        <td className={item.status === statusTypes.pending ? styles.status_pending
                            : item.status === statusTypes.rejected ? styles.status_rejected
                                : item.status === statusTypes.active ? styles.status_active
                                    : item.status === statusTypes.approved ? styles.status_approved
                                        : styles.status_finished
                        }>
                            <span>{item.status.charAt(0) + item.status.slice(1).toLowerCase()}</span>
                        </td>
                        <td className={styles.image_box} onClick={() => handleClick(item._id)}>
                            <Image
                                src={'/icons/caretRight-grey.svg'}
                                alt={'caret'}
                                width={20}
                                height={20}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TripsTable;