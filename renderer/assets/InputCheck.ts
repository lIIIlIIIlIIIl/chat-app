export const validateEmail = (email: string) => {
  const regex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  return regex.test(email);
};

export const validateNickname = (nickname: string) => {
  const regex = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,20}$/;

  return regex.test(nickname);
};
