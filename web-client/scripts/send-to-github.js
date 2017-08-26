// @flow
const allSet = process.env.SLING_APP_ALL_SET_1;
if (allSet !== 'yes') {
  throw new Error('APP CAN NOT BE DEPLOYED!!');
}
