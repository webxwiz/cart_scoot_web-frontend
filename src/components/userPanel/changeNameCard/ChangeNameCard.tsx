"use client";

import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { CHANGE_USER_NAME } from 'apollo/mutations/user';

import { UserNameInput } from 'components/inputs/_index';
import { UserNameValidation } from 'validation/userValidation';
import { useUserStore } from 'stores/userStore';

import styles from './changeName.module.scss';

const ChangeNameCard: React.FC<{ changeNameClick: () => void }> = ({ changeNameClick }) => {

    const [changeName] = useMutation(CHANGE_USER_NAME);
    const { addUser } = useUserStore();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<{ userName: string }>(UserNameValidation);

    const onSubmit = async (data: { userName: string }): Promise<void> => {
        const { userName } = data;
        try {
            const { data } = await changeName({
                variables: {
                    changeUserNameInput: {
                        userName,
                    }
                },
            });
            if (data.changeUserName._id) {
                toast.success('Name successfully changed', {
                    bodyClassName: "right-toast",
                    icon: <Image
                        src={'/icons/right-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
                changeNameClick();
                addUser(data.changeUserName);
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
        <div className={styles.container} onClick={changeNameClick}>
            <form
                className={styles.password_form}
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.upper_box}>
                    <Image
                        src={'/avatars/userAvatar.svg'}
                        alt={'key'}
                        width={120}
                        height={120}
                    />
                    <p className={styles.password_title}>Change Name</p>
                    <p className={styles.password_subtitle}>Please enter your name</p>
                    <UserNameInput
                        control={control}
                        error={errors.userName}
                    />
                </div>
                <div className='line' />
                <div className={styles.lower_box}>
                    <button onClick={changeNameClick}>Cancel</button>
                    <button type='submit'>Change Name</button>
                </div>
            </form>
        </div>
    );
};

export default ChangeNameCard;