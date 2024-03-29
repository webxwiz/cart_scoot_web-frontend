"use client";

import React from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'apollo/mutations/user';

import { PasswordInput } from 'components/inputs/PasswordInput';
import { ChangePasswordFormValidation } from 'validation/userValidation';

import styles from './changePassword.module.scss';

interface IPasswordData {
    currentPassword: string,
    password: string,
    confirmPassword: string,
}

interface IChangePasswordCard {
    openChangePasswordClick: () => void;
    changePasswordClick: () => void;

}

const ChangePasswordCard: React.FC<IChangePasswordCard> = ({ changePasswordClick, openChangePasswordClick }) => {

    const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
        onCompleted: (data) => {
            toast.success(data.changePassword.message, {
                bodyClassName: "right-toast",
                icon: <Image
                    src={'/icons/right-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
            changePasswordClick();
        },
        onError: (err) => toast.warn(err.message, {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        }),
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IPasswordData>(ChangePasswordFormValidation);

    const onSubmit = async (data: IPasswordData): Promise<void> => {
        const { currentPassword, password } = data;
        if (currentPassword === password) {
            toast.error('The same password!', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        } else {
            await changePassword({
                variables: {
                    changePasswordInput: {
                        password,
                        currentPassword,
                    }
                },
            });
        }
    };

    return (
        <div className={styles.container} onClick={openChangePasswordClick}>
            <form
                className={styles.password_form}
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.upper_box}>
                    <Image
                        src={'/avatars/keyAvatar.svg'}
                        alt={'key'}
                        width={120}
                        height={120}
                        className={styles.avatar}
                    />
                    <p className='title'>Change Password</p>
                    <p className='subtitle'>Please enter your Current & new password</p>
                    <PasswordInput
                        error={errors.currentPassword}
                        control={control}
                        placeholder='Current Password'
                        name='currentPassword'
                    />
                    <PasswordInput
                        error={errors.password}
                        control={control}
                        placeholder='New Password'
                        name='password'
                    />
                    <PasswordInput
                        error={errors.confirmPassword}
                        control={control}
                        placeholder='Repeat New Password'
                        name='confirmPassword'
                    />
                    <Link href={'/reset-password'}>
                        <p className={styles.reset}>Forgot Password?</p>
                    </Link>
                </div>
                <div className='line' />
                <div className={styles.lower_box}>
                    <button
                        type='button'
                        onClick={openChangePasswordClick}
                        className='button-grey-outlined'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='button-green-filled'
                    >
                        {loading ?
                            <Image
                                src={'/spinner.svg'}
                                alt={'spinner'}
                                width={48}
                                height={48}
                            />
                            : 'Change Password'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordCard;