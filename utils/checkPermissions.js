import { UnauthenticatedError} from "../errors/index.js";

const checkPermissons = (requestUser, resourceUserId) => {
    if(requestUser.userId === resourceUserId.toString()) return
    throw new UnauthenticatedError("Not authorized to accesss the route")
    
}

export default checkPermissons