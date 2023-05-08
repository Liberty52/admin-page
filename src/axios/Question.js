import axios from "axios";
import request from "./axios";

export const getQuestionList = async (page) => {
    return request.get(`/admin/questions?page=${page}&size=10`,{
        headers : {
            "Authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    })
}
export const getQuestionDetail = async (id) => {
    return request.get(`/admin/questions/${id}`, {
        headers: {
            "Authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    })
}


export const createQuestionReply = (id,content) => {
    return request.post(`/admin/questionReplies`, {
        questionId: id,
        content
    }, {
        headers: {
            "Authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    })
}

export const updateQuestionReply  = (id, content) => {
    return request.put(`/admin/questionReplies/${id}`,{
        content
    }, {
        headers: {
            "Authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    })
}

export const deleteQuestionReply = (id) => {
    return request.delete(`/admin/questionReplies/${id}`,{
        headers: {
            "Authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    })
}