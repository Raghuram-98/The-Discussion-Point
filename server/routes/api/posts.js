const express = require('express')
const router = express.Router()
var fire = require('./fire')
var db = fire.firestore();

//get posts
router.get('/',(req,res)=>{
    res.send('Hello')
})


//Set username
router.post('/register/:id',async(req,res)=>{
    console.log('Set username called')
    const post = await db.collection('UserDetails')

    await post.doc(req.params.id).set({
        username:req.body.username
    });
    res.status(201).send();
})

//get username
router.get('/getUserName/:id',async(req,res)=>{
    console.log('Get username called')
    const userRef = db.collection('UserDetails').doc(req.params.id);
    const doc = await userRef.get();
    if (!doc.exists) {
        res.send({
            "username":''
        });
    } else {
        res.send(doc.data());
    }
})

//post question
router.post('/postQuestion',async(req,res)=>{
    console.log('post question called')

    const post = db.collection('Questions')

    await post.doc().set({
        userid:req.body.userid,
        username:req.body.username,
        questionTitle:req.body.questionTitle,
        description:req.body.description,
        tagName:req.body.tagName,
        createdAt:req.body.createdAt,
    });
    res.status(201).send();
})

//get all questions
router.get('/getAllPosts',async(req,res)=>{

    console.log('get all questions called')

    const allPosts = await db.collection('Questions').orderBy('createdAt','desc').get();
    const posts = [];
    allPosts.forEach((doc) => {
        posts.push({
            id:doc.id,
            userid: doc.data().userid,
            username: doc.data().username,
            questionTitle: doc.data().questionTitle,
            description: doc.data().description,
            tagName: doc.data().tagName,
            createdAt: doc.data().createdAt,
        });
    });
    res.send(await posts);
})

//delete question
router.delete('/deletePost/:id',async(req,res)=>{
    console.log('delete question called')
    await db.collection('Questions').doc(req.params.id).delete();
    res.status(201).send();
})

//get individual post
router.get('/getPostDetail/:id',async(req,res)=>{
    console.log('get individual post called')
    const allPosts = await db.collection('Questions').doc(req.params.id).get();
    const posts = [];
    if (!allPosts.exists) {
        res.send({
            "id":'',
            "userid": '',
            "username": '',
            "questionTitle": '',
            "description": '',
            "tagName": '',
            "createdAt": '',
        });
    } else {
        res.send(allPosts.data());
    }
})

//post comment
router.post('/postComment',async(req,res)=>{
    console.log('post comment called')
    const comments = await db.collection("AllComments").doc(req.body.postId).collection('comments')
    await comments.add({
        postId:req.body.postId,
        username:req.body.username,
        userid:req.body.userid,
        comment:req.body.comment,
        createdAt: req.body.createdAt,
    })

    res.status(201).send();
})

//get all comments
router.post('/getAllComments',async(req,res)=>{
    console.log('get all comments called')
    const allComments = await db.collection("AllComments").doc(req.body.postId).collection("comments").orderBy('createdAt','desc').get();
    const comments = []
    allComments.forEach((doc)=>{
        comments.push({
            id:doc.id,
            postId:doc.data().postId,
            username:doc.data().username,
            userid:doc.data().userid,
            comment:doc.data().comment,
            createdAt: doc.data().createdAt,
        })
    })
    res.send(await comments)
})

// delete comment
router.post('/deleteComment',async(req,res)=>{
    console.log('delete comment called')
    await db.collection("AllComments").doc(req.body.postId).collection("comments").doc(req.body.id).delete();
    res.status(201).send();
})


//update question
router.put('/updateQuestion/:id',async(req,res)=>{
    console.log('update question called')
    const post = await db.collection('Questions').doc(req.params.id)
    await post.update({
        userid:req.body.userid,
        username:req.body.username,
        questionTitle:req.body.questionTitle,
        description:req.body.description,
        tagName:req.body.tagName,
        createdAt:req.body.createdAt,
    });
    res.status(201).send();
})

module.exports = router;