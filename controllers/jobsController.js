const createJob = async(req,res) => {
    res.send("job created")
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
