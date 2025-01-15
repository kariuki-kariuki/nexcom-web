import { API_URL } from '../../lib/common/constans';
import { getErrorMessage } from '../../utils/errors';
import { getAuthToken } from '../../utils/token';

interface Props {
  resource: string;
  formData: FormData;
}
export async function createImage<T>({
  resource,
  formData
}: Props): Promise<T | string> {
  const token = getAuthToken();
  try {
    const res = await fetch(`${API_URL}/${resource}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if (res.ok) {
      return await res.json(); // returns true if the deletion was successful, false otherwise
    }
    const parsedResponse = await res.json();
    return getErrorMessage(parsedResponse);
  } catch (error) {
    return 'Network error Occured';
  }
}
