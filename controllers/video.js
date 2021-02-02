const { response, request } = require("express");
const Video = require("../models/video");

const postVideos = async (req = request, res = response) => {
  try {
    const { video } = req.body;

    let videos = await Video.findOne({ video });

    if (videos) {
      return res.json({ message: "Video alredy published" });
    }

    videos = new Video(req.body);

    videos.save();

    res.json(videos);

  } catch (error) {
    console.log(error);
    return res.json({ message: "Comunicarse con soporte tecnico" });
  }
};

const getVideos = async (req = request , res = response) => {
     try {
          const videos = await Video.find()
          res.json(videos)
     } catch (error) {
     console.log(error);
     return res.json({ message: "Comunicarse con soporte tecnico" });
     }
}

const getVideoById = async (req = request , res = response) => {
  try {
      const {id} = req.params

      const video = await Video.findById(id)
      if (!video) {
        return res.json({message : 'no id'})
      }

      res.json(video)
  } catch (error) {
     console.log(error);
     return res.json({ message: "Comunicarse con soporte tecnico" });
  }
}

const editVideo = async (req = request , res = response) => {
  try {
    const {id} = req.params

    const video = await Video.findById(id)

    if (!video) {
      return res.json({message : 'no id'})
    }

    const newVideo = req.body

    const videoUpdated = await Video.findByIdAndUpdate(id , newVideo , {new : true})

    res.json(videoUpdated)
  } catch (error) {
    console.log(error);
     return res.json({ message: "Comunicarse con soporte tecnico" });
  }
}

const deleteVideo = async (req = request , res = response) => {
  try {
    const {id} = req.params

    const video = await Video.findById(id)

    if (!video) {
      return res.json({message : 'no id'})
    }

    await Video.findByIdAndDelete(id)

    res.json({ok : true})

  } catch (error) {
    console.log(error);
     return res.json({ message: "Comunicarse con soporte tecnico" });
  }
}
module.exports = {
  postVideos,
  getVideos,
  getVideoById,
  editVideo,
  deleteVideo
};
