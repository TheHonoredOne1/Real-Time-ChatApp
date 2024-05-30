import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);


    useEffect(() => {

        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };
        console.log("cookie : ", document.cookie)

        const getConversations = async () => {

            setLoading(true);
            try {

                const token = getCookieValue('jwt-cookie');
                if (!token) {
                    throw new Error("No authentication token found");
                }

                const res = await fetch("/api/users", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                setConversations(data);
            }
            catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};
export default useGetConversations;