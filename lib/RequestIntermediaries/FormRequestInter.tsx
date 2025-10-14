export async function FormRequestInter(
  onlineMethod: (formdata: FormData) => Promise<{ success: boolean; message: string }>,
  offlineMethod: (formdata: FormData) => Promise<{ success: boolean; message: string }>,
  formdata: FormData,
  isAuthenticated: boolean
): Promise<{ success: boolean; message: string }> {
  if (isAuthenticated) {
    try {
      return await onlineMethod(formdata);
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message
        };
      }
      return {
        success: false,
        message: "An unexpected error happened"
      };
    }
  } else {
    try {
      return await offlineMethod(formdata);
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error happened"
      };
    }
  }
}

