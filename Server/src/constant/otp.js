export const generateSixDigitOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
export const oneMinuteExpiry = (otpTime) => {
    const otpTimestamp = typeof otpTime === "number" ? otpTime : otpTime.getTime();
    const diffMinutes = (Date.now() - otpTimestamp) / 1000 / 60;
    return diffMinutes > 1;
};
export const threeMinuteExpiry = (otpTime) => {
    const otpTimestamp = typeof otpTime === "number" ? otpTime : otpTime.getTime();
    const diffMinutes = (Date.now() - otpTimestamp) / 1000 / 60;
    return diffMinutes >= 3; // ✅ true means expired
};
