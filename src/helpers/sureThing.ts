/**
 * Helper to handle promise errors and always return a resolved promise.
 * @param {promise} promise - The initial promise
 * @return {promise} A resolved promise with data or an error.
 */
export default function sureThing(promise: Promise<any>) {
  console.log(promise);
  return promise
    .then(result => ({ ok: true, result, error: undefined }))
    .catch(error => Promise.resolve({ ok: false, error, result: undefined }));
}
