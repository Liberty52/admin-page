import axios from "axios";

export const getQuestionList = async (page) => {
    return axios.get(`http://localhost:8080/all-questions?page=${page}&size=10`,{
        headers : {
            "X_Role" : "ADMIN"
        }
    })
}
export const getQuestionDetail = async (id) => {
    return axios.get(`http://localhost:8080/questions/${id}`, {
        headers: {
            "Authorization": localStorage.getItem("ACCESS_TOKEN")
        }
    })
}


export const createQuestionReply = (id,content) => {
    return axios.post(`http://localhost:8080/questionReplies`, {
        questionId: id,
        content
    }, {
        headers: {
            Authorization: "ADMIN-001",
            "X-Role": "ADMIN"
        }
    })
}

export const updateQuestionReply  = (id, content) => {
    return axios.put(`http://localhost:8080/questionReplies/${id}`,{
        content
    }, {
        headers: {
            Authorization: "ADMIN-001",
            "X_Role": "ADMIN"
        }
    })
}

export const deleteQuestionReply = (id) => {
    return axios.delete(`http://localhost:8080/questionReplies/${id}`,{
        headers: {
            Authorization: "ADMIN-001",
            "X-Role": "ADMIN"
        }
    })
        .then(r => alert("삭제되었습니다."))
        .catch(err => console.error(err));
}