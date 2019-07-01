import { CALL_API } from './../apiMiddleware';
import { actionTypes } from './../actionTypes';

export const eventLoadActions = actionTypes('EVENT_LOAD');
export const allWorkshopLoadActions = actionTypes('ALL_WORKSHOP_LOAD');
export const allMeetupLoadActions = actionTypes('ALL_MEETUP_LOAD');
export const scanAttendeeActions = actionTypes('ATTENDEE_SCAN');
export const getEvents = onSuccess => {
  return async dispatch => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        type: eventLoadActions,
        endpoint: `/api/getMyEvent`,
      },
    });
    if (actionResponse.type === eventLoadActions.SUCCESS && onSuccess) {
      onSuccess(actionResponse);
    }
    return actionResponse;
  };
};

export const getAllWorkshops = onSuccess => {
  return async dispatch => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        type: allWorkshopLoadActions,
        endpoint: `/api/getMyEvent?type=Workshop&all=1`,
      },
    });
    if (actionResponse.type === allWorkshopLoadActions.SUCCESS && onSuccess) {
      onSuccess(actionResponse);
    }
    return actionResponse;
  };
};

export const getAllMeetups = onSuccess => {
  return async dispatch => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        type: allMeetupLoadActions,
        endpoint: `/api/getMyEvent?type=Meetup&all=1`,
      },
    });
    if (actionResponse.type === allMeetupLoadActions.SUCCESS && onSuccess) {
      onSuccess(actionResponse);
    }
    return actionResponse;
  };
};

export const doScanAttendee = ({ eventId, attendeId }, onSuccess, onError) => {
  const data = {
    eventId,
    attendeId,
  };
  return async dispatch => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        type: scanAttendeeActions,
        method: 'POST',
        endpoint: `/api/markAttendance`,
        data: JSON.stringify(data),
      },
    });
    getEvents();
    if (actionResponse.type === scanAttendeeActions.SUCCESS) {
      onSuccess(actionResponse);
    }
    if (actionResponse.type === scanAttendeeActions.ERROR) {
      onError(actionResponse);
    }
    return actionResponse;
  };
};
