

import {Router} from "express";
import Certificates from "../models/certificatemodel.js";
const router=Router();

router.get("/home",(req,res) => {
    res.send("Welcome Certiapp")
});

// router.post("/issue",async (req, res) => {
//     try {
//         const { course, certificateId, candidatename, grade, date } = req.body
//         // if (course.get(CourseName)) {
//         console.log(course)

//         if (await Certificates.findOne({ course })){

        
//             return res.status(400).json({ msg: "Certificate already exists" });
//         }
//         else {
            
//                 const newCourse = new Certificates({
//                     course: course,
//                     certificateId: Number(certificateId),
//                     candidatename: candidatename,
//                     grade: grade,
//                     date: Number(date)
//                 });

//                 await newCourse.save();

//                 res.status(201).json({ msg: "cerifiedcourse successfully entered" })
//             }}
//             catch (error) {
//                 console.error(error);
//                res.status(500).json({ msg: "Something went wrong" });
// }  
        
//     })

    router.post('/issue', async (req, res) => {
    try {
        const newCourse = new Certificates({
        course: req.body.course,
            certificateId: req.body.certificateId,
            candidatename:req.body.candidatename,
            grade: req.body.grade,
            date:req.body.date
        });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});



        
        

router.get("/view",async(req,res) => {
    try{
        const candidates=await Certificates.find();
// res.status(200).json(Object.fromEntries(course))
res.status(200).json(candidates)
    }
    catch(error){
        console.error(error);
        res.status(500).json("Internal sever error")
    }
})


router.get("/courseName", async (req, res) => {
    try {
        console.log(req.query);

        const key = req.query.course;

        const result = await Certificates.find({ course: key });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ msg: "Course Not Found" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}); 



router.put("/Update",async (req, res) => {
    try {
        const { course, certificateId, candidatename, grade, date} = req.body

        
            if (await Certificates.findOne({ course: course })) {
          
                await Certificates.updateOne({ course: course }, {
        certificateId: Number(certificateId),
        candidatename: candidatename,
        grade: grade,
        date: Number(date)
      });
            res.status(200).json({ msg: "Course successfully Updated" })

        }
        else {

            res.status(404).json({ msg: "Course not found" })
        }
    }
    catch {
        res.status(201).json({ msg: "error" })
    }
})


export {router};



