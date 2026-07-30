// যখন ব্যাকএন্ড রেডি হবে, তখন এখানে রিয়েল বেস ইউআরএল বসাবেন
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com/v1';

export const API_ENDPOINTS = {
  SUBMIT_APPLICATION: '/applications', // ব্যাকএন্ড রুট এন্ডপয়েন্ট
};