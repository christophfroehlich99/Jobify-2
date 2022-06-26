import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError, UnauthenticatedError} from "../errors/index.js"



const createJob = async(req,res) => {
    const {position,company} = req.body

    if(!position || !company){
        throw new BadRequestError("Please provide all values")
    }
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req,res) => {
    res.send("here are all your jobs")
}

const showStats = async (req,res) => {
    res.send("Here are all stats")
}

const deleteJob = async (req,res) => {
    res.send("deleted this Job !")
}

const updateJob = async (req,res) => {
    res.send("updated this Job")
}


export {createJob,getAllJobs,showStats,deleteJob,updateJob}
