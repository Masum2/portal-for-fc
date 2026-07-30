import type { SubmitApplicationPayload } from "../../types/application";


// ফেক এপিআই ডিলে (নেটওয়ার্ক লেটেন্সি দেখানোর জন্য ১ সেকেন্ড)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockSubmitApplication = async (payload: SubmitApplicationPayload) => {
  await delay(1200); // ১.২ সেকেন্ড লোডিং টাইম সিমুলেট করা হলো

  // এখানে চাইলে লোকালস্টোরেজে ডাটা সেভ করে রাখতে পারেন টেস্ট করার জন্য
  console.log('Mock API received payload:', payload);

  // সফল রেসপন্স রিটার্ন করছি
  return {
    success: true,
    message: 'Application submitted successfully via Mock API!',
    data: {
      applicationId: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      submittedAt: new Date().toISOString(),
      ...payload,
    },
  };
};