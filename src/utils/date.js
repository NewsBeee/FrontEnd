// weekStart
export function getKSTDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const kst = new Date(now.getTime() - offset);

    return kst.toISOString().split('T')[0];
}