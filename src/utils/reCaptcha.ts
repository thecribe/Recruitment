export const getRecaptchaToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      reject("Missing reCAPTCHA site key");
      return;
    }

    if (!window.grecaptcha) {
      reject("reCAPTCHA not loaded");
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action: "register_applicant" })
        .then(resolve)
        .catch(reject);
    });
  });
};
