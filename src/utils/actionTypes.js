export const actionTypes = prefix => {
  return {
    BEGIN: `${prefix}_BEGIN`,
    SUCCESS: `${prefix}_SUCCESS`,
    ERROR: `${prefix}_ERROR`,
    prefix,
  };
};
