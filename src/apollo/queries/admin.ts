import { gql } from "@apollo/client";

export const GET_DRIVER_WITH_RATING = gql`
    query GetDriverWithRating($driverId: ID!) {
        getDriverWithRating(driverId: $driverId) {
            rating
            totalCount
            driver {
                _id
                avatarURL
                banned
                coordinates {
                    lat
                    lon
                }
                createdAt
                driverRequests
                email
                license {
                    message
                    status
                    url
                }
                phone {
                    confirmed
                    number
                }
                role
                userName
                workingDays
                workingTime {
                    from
                    to
                }
            }
        }
    }
`;

export const GET_ALL_DRIVERS = gql`
    query GetAllDrivers($getAllUsersInput: GetAllUsersInput) {
        getAllDrivers(getAllUsersInput: $getAllUsersInput) {
            totalCount
            users {
                _id
                avatarURL
                banned
                coordinates {
                    lat
                    lon
                }
                createdAt
                driverRequests
                email
                license {
                    message
                    status
                    url
                }
                phone {
                    confirmed
                    number
                }
                role
                userName
                workingDays
                workingTime {
                    from
                    to
                }
            }
        }
    }
`;

export const GET_ALL_RIDERS = gql`
    query GetAllRiders($getAllUsersInput: GetAllUsersInput) {
        getAllRiders(getAllUsersInput: $getAllUsersInput) {
            totalCount
            users {
                _id
                avatarURL
                banned
                driverRequests
                email
                phone {
                    confirmed
                    number
                }
                role
                userName
            }
        }
    }
`;

export const GET_ALL_REQUESTS = gql`
    query GetAllRequests($getAllRequestsInput: GetAllRequestsInput) {
        getAllRequests(getAllRequestsInput: $getAllRequestsInput) {
            requests {
                _id
                carType
                coordinates {
                    end {
                        lat
                        lon
                    }
                    start {
                        lat
                        lon
                    }
                }
                createdAt
                driverId {
                    _id
                    userName
                    avatarURL
                    phone {
                        confirmed
                        number
                    }
                }
                dropoffLocation
                pickupLocation
                requestCode
                requestedTime
                status
                userId {
                    _id
                    userName
                    avatarURL
                    phone {
                        confirmed
                        number
                    }
                }
            }
            totalCount
        }
    }
`;

export const GET_ALL_REVIEWS = gql`
    query GetAllReviews($getAllReviewsInput: GetAllReviewsInput) {
        getAllReviews(getAllReviewsInput: $getAllReviewsInput) {
            reviews {
                _id
                createdAt
                createdBy {
                    _id
                    userName
                    avatarURL
                }
                driverId
                rating
                requestCode
                text
            }
            totalCount
        }
    }
`;

export const GET_WAITING_LICENSES = gql`
    query GetWaitingLicenses {
        getWaitingLicenses {
            _id
            avatarURL
            banned
            coordinates {
                lat
                lon
            }
            createdAt
            driverRequests
            email
            license {
                message
                status
                url
            }
            phone {
                confirmed
                number
            }
            role
            userName
            workingDays
            workingTime {
                from
                to
            }
        }
    }
`;

export const GET_STATISTIC = gql`
    query GetStatistic {
        getStatistic {
            totalDrivers
            totalRiders
            totalTrips
        }
    }
`;

export const GET_REVIEW_BY_REQUEST_CODE = gql`
    query GetReviewByRequestCode($requestCode: String) {
        getReviewByRequestCode(requestCode: $requestCode) {
            _id
            createdAt
            createdBy {
                _id
                avatarURL
                userName
            }
            driverId {
                _id
                avatarURL
                userName
            }
            rating
            requestCode
            text
        }
    }
`;
