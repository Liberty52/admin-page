import axios from "axios";
import request from "./axios";
import {
    CREATE_QUESTION_REPLY,
    DELETE_QUESTION_REPLY,
    QUESTION_DETAIL,
    QUESTION_LIST,
    UPDATE_QUESTION_REPLY
} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/token";

export const getQuestionList = async (page) => {
    return request.get(QUESTION_LIST(page,10),{
        headers : {
            Authorization: sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}
export const getQuestionDetail = async (id) => {
    return request.get(QUESTION_DETAIL(id), {
        headers: {
            Authorization: sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}


export const createQuestionReply = (id,content) => {
    return request.post(CREATE_QUESTION_REPLY(), {
        questionId: id,
        content
    }, {
        headers: {
            Authorization: sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}

export const updateQuestionReply  = (id, content) => {
    return request.put(UPDATE_QUESTION_REPLY(id),{
        content
    }, {
        headers: {
            Authorization: sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}

export const deleteQuestionReply = (id) => {
    return request.delete(DELETE_QUESTION_REPLY(id),{
        headers: {
            Authorization: sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}