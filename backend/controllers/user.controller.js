import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {

    try {

        const loggedInUserId = req.user._id
        // console.log(loggedInUserId)
        
        const filteredUsers = await User.find( { _id: { $ne: loggedInUserId } } ).select("-password");
        // on the left side we don't want to see ourselves //

        res.status(200).json(filteredUsers)

    }
    catch (error) {

        console.error("Error in getUsersForSidebar : ", error.message)

        res.status(500).json({ error: "Internal Server Error in user controller." })

    }

}