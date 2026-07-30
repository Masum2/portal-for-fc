import { useState } from 'react';

import { mockSubmitApplication } from '../api/mock/applicationMock';
import type { SubmitApplicationPayload } from '../types/application';
// ব্যাকএন্ড আসলে এখানে axios বা fetch ইমপোর্ট করবেন

export const useApplication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any>(null);

  const submitApplication = async (payload: SubmitApplicationPayload) => {
    setIsLoading(true);
    setError(null);
    setSuccessData(null);

    try {
      // ---------------------------------------------------------
      // 🔄 SWITCH HERE WHEN BACKEND IS READY:
      // const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.SUBMIT_APPLICATION}`, payload);
      // const result = response.data;
      // ---------------------------------------------------------

      // বর্তমান মক কল:
      const result = await mockSubmitApplication(payload);

      setSuccessData(result);
      setIsLoading(false);
      return { success: true, data: result };
    } catch (err: any) {
      const errorMsg = err.message || 'Something went wrong!';
      setError(errorMsg);
      setIsLoading(false);
      return { success: false, error: errorMsg };
    }
  };

  return {
    submitApplication,
    isLoading,
    error,
    successData,
  };
};