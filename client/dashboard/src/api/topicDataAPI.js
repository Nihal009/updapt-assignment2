import { axiosInstance } from "./axiosInstance";

export const AddData=()=>axiosInstance.post('/addTopic',topicData);
export const DeleteData=()=>axiosInstance.delete('/Delete')
