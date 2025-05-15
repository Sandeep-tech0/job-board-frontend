import { apiRequest } from "./apiRequest";


export const getJobs = async () => {
    const api = await apiRequest({
        url: "/jobs",
        method: "get",
        header: false,
    });
    return api.data;
};

export const getJobById = async (id) => {
    const api = await apiRequest({
        url: `/jobs/${id}`,
        method: "get",
        header: false,
    });
    return api.data;
};

export const createJob = async (data) => {
    const api = await apiRequest({
        url: "/jobs",
        method: "post",
        header: false,
        body: data,
    });
    return api.data;
};
