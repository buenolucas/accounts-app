/**
 * Generate random string to use with id´s
 *
 * @param lenth
 * @returns
 */
export const generanteID = (lenth: number = 10) => {
  const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const random = Array.from(
    {length: lenth},
    () => char[Math.floor(Math.random() * char.length)],
  );
  const randomString = random.join('');
  return randomString;
};
