export const getRecaptchaToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject("reCAPTCHA not loaded");
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
          action: "register_applicant",
        })
        .then(resolve)
        .catch(reject);
    });
  });
};
