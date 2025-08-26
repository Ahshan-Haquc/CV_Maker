import axiosInstance from "./axiosInstance";

export const deleteUser =async (userId)=>{
    try {
        const response = await axiosInstance.delete(`/admin/deleteUser/${userId}`);
        if(response.data.success){
            alert("User Deleted");
        }else{
            alert("not deleted");
        }
    } catch (error) {
        alert("error");
    }
}

export const blockUser = async (userId)=>{
    try {
        const response = await axiosInstance.patch(`/admin/blockUser/${userId}`);
        if(response.data.success){
            alert("User Blocked");
        }else{
            alert("not blocked");
        }
    } catch (error) {
        alert("error");
    }
}
export const unblockUser = async (userId)=>{
    try {
        const response = await axiosInstance.patch(`/admin/unblockUser/${userId}`);
        if(response.data.success){
            alert("User unblockUser");
        }else{
            alert("not unblockUser");
        }
    } catch (error) {
        alert("error");
    }
}