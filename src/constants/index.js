/*import {
  REACT_APP_API_URL,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH_CALLBACK_URL
} from 'react-native-dotenv';*/

const REACT_APP_API_URL = '';
const REACT_APP_AUTH_DOMAIN = '';
const REACT_APP_AUTH_CLIENT_ID = '';
const REACT_APP_AUTH_CALLBACK_URL = '';

export const LOCAL_STORAGE = {
  TOKEN: `AOL-TOKEN`,
  REFRESH_TOKEN: `AOL-REFRESH-TOKEN`,
};

export const API = {
  REST: {
    USER_PROFILE: `${REACT_APP_API_URL}/api/profile`,
    UPDATE_USER_PROFILE: `${REACT_APP_API_URL}/api/updateProfile`,
    REFRESH_TOKEN: `${REACT_APP_API_URL}/api/refreshtoken`,
    GET_TEACHER_MASTER_DETAIL: `${REACT_APP_API_URL}/api/teacherMasterDetail`,
    RESEND_EMAIL_VERIFICATION: `${REACT_APP_API_URL}/api/resendEmailVerification`,
    LOG_CASE: `${REACT_APP_API_URL}/api/logCase`,
    LOG_LEAD: `${REACT_APP_API_URL}/api/logLead`,
    CHARGE: `${REACT_APP_API_URL}/api/charge`,
    UPDATE_USER_CC: `${REACT_APP_API_URL}/api/updateUserCreditCard`,
    DAILY_PRACTICE: `${REACT_APP_API_URL}/api/dailyPractice`,
    ALL_MEDITATION: `${REACT_APP_API_URL}/api/meditations`,
    MEDITATION_CATEGORY: `${REACT_APP_API_URL}/api/meditationCategory`,
    MEDITATION_DETAIL: `${REACT_APP_API_URL}/api/meditationDetail`,
    ALL_COURSES: `${REACT_APP_API_URL}/api/courses`,
    COURSE_CATEGORY: `${REACT_APP_API_URL}/api/courseCategory`,
    COURSE_DETAIL: `${REACT_APP_API_URL}/api/courseDetail`,
    CHAPTER_DETAIL: `${REACT_APP_API_URL}/api/chapterDetail`,
    MICRO_LEARNING: `${REACT_APP_API_URL}/api/microlearnings`,
    MICRO_LEARNING_CATEGORY: `${REACT_APP_API_URL}/api/microlearningCategory`,
    STRIPECUSTOMER: `${REACT_APP_API_URL}/api/stripecustomer`,
    ALL_WORKSHOPS: `${REACT_APP_API_URL}/api/workshops`,
    RECOMMENDED_WORKSHOPS: `${REACT_APP_API_URL}/api/recommendedWorkshops`,
    NEAR_BY_WORKSHOPS: `${REACT_APP_API_URL}/api/nearbyWorkshops`,
    WORKSHOP_DETAIL: `${REACT_APP_API_URL}/api/workshopDetail`,
    WORKSHOP_DETAIL_BY_ATTENDEE: `${REACT_APP_API_URL}/api/getWorkshopByAttendee`,
    MICROLEARNING_DETAIL: `${REACT_APP_API_URL}/api/microlearningDetail`,
    SUBSCIPTION: `${REACT_APP_API_URL}/api/subsciption`,
    CREATE_AND_PAY_ORDER: `${REACT_APP_API_URL}/api/createAndPayOrder`,
    COMPLETE_REGISTERATION: `${REACT_APP_API_URL}/api/completeRegisteration`,
    APPLY_COUPON: `${REACT_APP_API_URL}/api/applyCoupon`,
    FIND_USER_BY_EMAIL: `${REACT_APP_API_URL}/api/findUserByEmail`,
    UPDATE_USER_ACTIVITY: `${REACT_APP_API_URL}/api/updateUserActivity`,
    ALL_MEETUPS: `${REACT_APP_API_URL}/api/meetups`,
    GET_ALL_MEETUP_MASTER: `${REACT_APP_API_URL}/api/getAllMeetupMaster`,
    NEAR_BY_MEETUPS: `${REACT_APP_API_URL}/api/nearbyMeetups`,
    MEETUP_DETAIL: `${REACT_APP_API_URL}/api/meetupDetail`,
    RIGISTER_FOR_MEETUP: `${REACT_APP_API_URL}/api/registerForMeetup`,
    CANCEL_RSVP_FOR_MEETUP: `${REACT_APP_API_URL}/api/cancelRSVPForMeetup`,
    CONTENT_DETAIL: `${REACT_APP_API_URL}/api/contentDetail`,
  },
  AUTH: `${REACT_APP_API_URL}/__/auth/saml`,
  AUTH_LOGOUT: `${REACT_APP_API_URL}/__/auth/logout`,
};

export const AUTH = {
  domain: REACT_APP_AUTH_DOMAIN,
  clientId: REACT_APP_AUTH_CLIENT_ID,
  callbackUrl: REACT_APP_AUTH_CALLBACK_URL,
};

export const APP = {};
