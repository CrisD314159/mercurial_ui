import { APIURL } from "../types/definitions";


export async function SchedulePushNotification(token:string | null, title:string, dueDate:Date | undefined) {
  const response = await fetch(`${APIURL}/pushnotification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      title,
      message: `Your task is about to expire`,
      link: "https://localhost:3000/dashboard/todo",
      dueDate: new Date(dueDate?.toString() ?? Date.now().toString())
    }),
  });

  if(response.status !== 200){
    throw new Error("An error occurred while scheduling the assignment")
  }else{
    return {
      success: true,
      message: "Assignment Scheduled"
    }
  }  
}