import { actionTypes } from './../actionTypes';
import { sortBy } from 'lodash';
import moment from 'moment';

export const eventLoadActions = actionTypes('EVENT_LOAD');
export const allWorkshopLoadActions = actionTypes('ALL_WORKSHOP_LOAD');
export const allMeetupLoadActions = actionTypes('ALL_MEETUP_LOAD');
export const scanAttendeeActions = actionTypes('ATTENDEE_SCAN');

const initialState = {
  data: [],
  workshops: [],
  meetups: [],
  scan: [],
  scanAttendeeLoading: false,
  scanAttendeeError: false,
  eventsLoading: true,
  eventsError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case eventLoadActions.BEGIN: {
      return { ...state, eventsLoading: true, eventsError: false };
    }
    case eventLoadActions.ERROR: {
      return { ...state, eventsLoading: false, eventsError: true };
    }
    case eventLoadActions.SUCCESS: {
      const data = sortBy(action.response, o => {
        return o.eventstartdategmt
          ? new moment(o.eventstartdategmt)
          : new moment(new Date());
      });
      return {
        ...state,
        data: [...data],
        eventsLoading: false,
        eventsError: false,
      };
    }
    case allWorkshopLoadActions.BEGIN: {
      return { ...state, eventsLoading: true, eventsError: false };
    }
    case allWorkshopLoadActions.ERROR: {
      return { ...state, eventsLoading: false, eventsError: true };
    }
    case allWorkshopLoadActions.SUCCESS: {
      const data = sortBy(action.response, o => {
        return o.eventstartdategmt
          ? new moment(o.eventstartdategmt)
          : new moment(new Date());
      });
      return {
        ...state,
        workshops: [...data],
        eventsLoading: false,
        eventsError: false,
      };
    }
    case allMeetupLoadActions.BEGIN: {
      return { ...state, eventsLoading: true, eventsError: false };
    }
    case allMeetupLoadActions.ERROR: {
      return { ...state, eventsLoading: false, eventsError: true };
    }
    case allMeetupLoadActions.SUCCESS: {
      const data = sortBy(action.response, o => {
        return o.eventstartdategmt
          ? new moment(o.eventstartdategmt)
          : new moment(new Date());
      });
      return {
        ...state,
        meetups: [...data],
        eventsLoading: false,
        eventsError: false,
      };
    }
    case scanAttendeeActions.BEGIN: {
      return { ...state, scanAttendeeLoading: true, scanAttendeeError: false };
    }
    case scanAttendeeActions.ERROR: {
      return { ...state, scanAttendeeLoading: false, scanAttendeeError: true };
    }
    case scanAttendeeActions.SUCCESS: {
      return {
        ...state,
        //scan: [...state.scan, action.response.attendeeId],
        scanAttendeeLoading: false,
        scanAttendeeError: false,
      };
    }
    default:
      return state;
  }
};
