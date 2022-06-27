import User from "../models/User.js"
import {StatusCodes} from "http-status-codes"
import {BadRequestError, UnauthenticatedError} from "../errors/index.js"


const register = async (req,res, next) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError("Please provide all values")
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError("Email already in use")
    }
    const user = await User.create({name, email, password})
    const token = user.createJWT()
    //console.log(user)
    res.status(StatusCodes.CREATED).json({
        user:{
            email:user.email, 
            name:user.name, 
            location:user.location,
            lastName:user.lastName
        },
        token, 
        location: user.location
    })
}

const login = async (req,res) => {
    const { password, email } = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide all values")
    }
    const user = await User.findOne({ email }).select("+password")
    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token, location: user.location})
}

const updateUser = async (req,res) => {
    const {name, email, location, lastName} = req.body
    if (!name || !email || !location || !lastName){
        throw new BadRequestError("Please provide all values")
    }
    const user = await User.findOne({_id : req.user.userId})

    user.name = name
    user.email = email
    user.location = location
    user.lastName = lastName
    
    await user.save()
    
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user, token, location: user.location})
}

export {register, login, updateUser}